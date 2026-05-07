"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { educationGalleryImages, educationLogoAssets } from "../../data/education";
import { type Translation } from "../../data/i18n/en";
import { SkillTag } from "../ui/SkillChip";
import EntityLogo from "../ui/EntityLogo";

export default function EducationSection({ t }: { t: Translation }) {
  const [educationCarouselStates, setEducationCarouselStates] = useState(
    () => t.education.entries.map(() => ({ current: 0, previous: null as number | null, direction: 1 as 1 | -1, animating: false })),
  );
  const [educationCarouselPaused, setEducationCarouselPaused] = useState(
    () => t.education.entries.map(() => false),
  );
  const [mobileCarouselStates, setMobileCarouselStates] = useState(() =>
    t.education.entries.map((_, entryIndex) => {
      const imageCount = (educationGalleryImages[entryIndex] ?? []).length;
      return {
        logicalIndex: 0,
        trackIndex: imageCount > 0 ? imageCount : 0,
        transitionEnabled: true,
        dragOffsetPx: 0,
        dragging: false,
      };
    }),
  );
  const animationTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout> | null>>([]);
  const touchStartXRef = useRef<number[]>([]);
  const mobileTrackWidthsRef = useRef<number[]>([]);

  const getWrappedLogicalIndex = useCallback((logicalIndex: number, imageCount: number) => {
    if (imageCount <= 0) return 0;
    return ((logicalIndex % imageCount) + imageCount) % imageCount;
  }, []);

  const getMiddleBandTrackIndex = useCallback((logicalIndex: number, imageCount: number) => {
    if (imageCount <= 1) return 0;
    return imageCount + getWrappedLogicalIndex(logicalIndex, imageCount);
  }, [getWrappedLogicalIndex]);

  const normalizeMobileCarouselTrack = useCallback((entryIndex: number, imageCount: number) => {
    if (imageCount <= 1) return;
    let shouldReEnableTransition = false;
    setMobileCarouselStates((prev) => {
      const next = [...prev];
      const state = next[entryIndex];
      if (!state) return prev;
      if (state.trackIndex < imageCount || state.trackIndex >= imageCount * 2) {
        next[entryIndex] = {
          ...state,
          trackIndex: getMiddleBandTrackIndex(state.logicalIndex, imageCount),
          transitionEnabled: false,
          dragOffsetPx: 0,
          dragging: false,
        };
        shouldReEnableTransition = true;
      }
      return next;
    });
    if (shouldReEnableTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileCarouselStates((prev) => {
            const next = [...prev];
            const state = next[entryIndex];
            if (!state) return prev;
            next[entryIndex] = { ...state, transitionEnabled: true };
            return next;
          });
        });
      });
    }
  }, [getMiddleBandTrackIndex]);

  const moveMobileCarousel = useCallback((entryIndex: number, direction: 1 | -1) => {
    const images = educationGalleryImages[entryIndex] ?? [];
    if (images.length <= 1) return;
    setMobileCarouselStates((prev) => {
      const next = [...prev];
      const state = next[entryIndex];
      if (!state) return prev;
      next[entryIndex] = {
        ...state,
        logicalIndex: getWrappedLogicalIndex(state.logicalIndex + direction, images.length),
        trackIndex: state.trackIndex + direction,
        transitionEnabled: true,
        dragOffsetPx: 0,
        dragging: false,
      };
      return next;
    });
  }, [getWrappedLogicalIndex]);

  useEffect(() => {
    const animationTimeouts = animationTimeoutsRef.current;
    const interval = setInterval(() => {
      setEducationCarouselStates((prev) =>
        prev.map((state, entryIndex) => {
          const images = educationGalleryImages[entryIndex] ?? [];
          if (images.length <= 1 || educationCarouselPaused[entryIndex]) return state;
          if (animationTimeouts[entryIndex]) clearTimeout(animationTimeouts[entryIndex]);
          const nextState = {
            current: (state.current + 1) % images.length,
            previous: state.current,
            direction: 1 as const,
            animating: true,
          };
          animationTimeouts[entryIndex] = setTimeout(() => {
            setEducationCarouselStates((currentStates) => {
              const updatedStates = [...currentStates];
              const targetState = updatedStates[entryIndex];
              if (!targetState) return currentStates;
              updatedStates[entryIndex] = { ...targetState, previous: null, animating: false };
              return updatedStates;
            });
            animationTimeouts[entryIndex] = null;
          }, 450);
          return nextState;
        }),
      );
    }, 3000);
    return () => {
      clearInterval(interval);
      animationTimeouts.forEach((timeoutId) => { if (timeoutId) clearTimeout(timeoutId); });
    };
  }, [educationCarouselPaused]);

  useEffect(() => {
    const mobileInterval = setInterval(() => {
      setMobileCarouselStates((prev) => {
        const next = [...prev];
        t.education.entries.forEach((_, entryIndex) => {
          const images = educationGalleryImages[entryIndex] ?? [];
          if (images.length <= 1 || educationCarouselPaused[entryIndex]) return;
          const state = next[entryIndex];
          if (!state) return;
          next[entryIndex] = {
            ...state,
            logicalIndex: getWrappedLogicalIndex(state.logicalIndex + 1, images.length),
            trackIndex: state.trackIndex + 1,
            transitionEnabled: true,
            dragOffsetPx: 0,
            dragging: false,
          };
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(mobileInterval);
  }, [educationCarouselPaused, getWrappedLogicalIndex, t.education.entries]);

  const handleMobileTrackTransitionEnd = (entryIndex: number, imageCount: number) => {
    if (imageCount <= 1) return;
    const trackIndex = mobileCarouselStates[entryIndex]?.trackIndex ?? imageCount;
    if (trackIndex >= imageCount && trackIndex < imageCount * 2) return;
    normalizeMobileCarouselTrack(entryIndex, imageCount);
  };

  const showPrevImage = (entryIndex: number) => {
    setEducationCarouselStates((prev) => {
      const images = educationGalleryImages[entryIndex] ?? [];
      if (images.length <= 1) return prev;
      if (animationTimeoutsRef.current[entryIndex]) clearTimeout(animationTimeoutsRef.current[entryIndex]);
      const next = [...prev];
      const currentState = next[entryIndex];
      if (!currentState) return prev;
      next[entryIndex] = {
        current: (currentState.current - 1 + images.length) % images.length,
        previous: currentState.current,
        direction: -1,
        animating: true,
      };
      animationTimeoutsRef.current[entryIndex] = setTimeout(() => {
        setEducationCarouselStates((currentStates) => {
          const updatedStates = [...currentStates];
          const targetState = updatedStates[entryIndex];
          if (!targetState) return currentStates;
          updatedStates[entryIndex] = { ...targetState, previous: null, animating: false };
          return updatedStates;
        });
        animationTimeoutsRef.current[entryIndex] = null;
      }, 450);
      return next;
    });
  };

  const showNextImage = (entryIndex: number) => {
    setEducationCarouselStates((prev) => {
      const images = educationGalleryImages[entryIndex] ?? [];
      if (images.length <= 1) return prev;
      if (animationTimeoutsRef.current[entryIndex]) clearTimeout(animationTimeoutsRef.current[entryIndex]);
      const next = [...prev];
      const currentState = next[entryIndex];
      if (!currentState) return prev;
      next[entryIndex] = {
        current: (currentState.current + 1) % images.length,
        previous: currentState.current,
        direction: 1,
        animating: true,
      };
      animationTimeoutsRef.current[entryIndex] = setTimeout(() => {
        setEducationCarouselStates((currentStates) => {
          const updatedStates = [...currentStates];
          const targetState = updatedStates[entryIndex];
          if (!targetState) return currentStates;
          updatedStates[entryIndex] = { ...targetState, previous: null, animating: false };
          return updatedStates;
        });
        animationTimeoutsRef.current[entryIndex] = null;
      }, 450);
      return next;
    });
  };

  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-sky-600">{t.education.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.education.heading}
        </h2>
        <div className="mt-10 space-y-6">
          {t.education.entries.map((entry, index) => (
            <div
              key={entry.institution + entry.period}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8"
            >
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-stretch lg:gap-8">
                <div>
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                    <a href={entry.website} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <EntityLogo {...educationLogoAssets[index]} className="h-12 w-12 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl" />
                    </a>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-slate-950 sm:text-xl">
                        <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">{entry.institution}</a>
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-700 sm:text-base">
                        <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">{entry.degree} · {entry.field}</a>
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                          {entry.period}
                        </span>
                        <span className="text-xs text-slate-500 sm:text-sm">{entry.location}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {entry.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-7 text-slate-600">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5">
                    {entry.skills.map((skill) => (
                      <SkillTag key={skill} name={skill} />
                    ))}
                  </div>
                </div>

                {/* Mobile carousel */}
                <div
                  className="relative mt-5 touch-pan-y lg:hidden"
                  onTouchStart={(event) => {
                    const images = educationGalleryImages[index] ?? [];
                    if (images.length > 1) {
                      setMobileCarouselStates((prev) => {
                        const next = [...prev];
                        const state = next[index];
                        if (!state) return prev;
                        next[index] = {
                          ...state,
                          trackIndex: getMiddleBandTrackIndex(state.logicalIndex, images.length),
                          transitionEnabled: false,
                          dragOffsetPx: 0,
                          dragging: true,
                        };
                        return next;
                      });
                    }
                    touchStartXRef.current[index] = event.touches[0]?.clientX ?? 0;
                    mobileTrackWidthsRef.current[index] = event.currentTarget.getBoundingClientRect().width;
                    setEducationCarouselPaused((prev) => { const next = [...prev]; next[index] = true; return next; });
                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;
                      next[index] = { ...state, dragOffsetPx: 0, dragging: true };
                      return next;
                    });
                  }}
                  onTouchMove={(event) => {
                    const currentX = event.touches[0]?.clientX ?? touchStartXRef.current[index] ?? 0;
                    const startX = touchStartXRef.current[index] ?? currentX;
                    const deltaX = currentX - startX;
                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;
                      next[index] = { ...state, dragOffsetPx: deltaX };
                      return next;
                    });
                  }}
                  onTouchEnd={(event) => {
                    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
                    const touchStartX = touchStartXRef.current[index] ?? touchEndX;
                    const deltaX = touchEndX - touchStartX;
                    const trackWidth = mobileTrackWidthsRef.current[index] ?? 1;
                    const switchThreshold = Math.max(trackWidth * 0.16, 40);
                    if (Math.abs(deltaX) > switchThreshold) {
                      moveMobileCarousel(index, deltaX > 0 ? -1 : 1);
                    } else {
                      setMobileCarouselStates((prev) => {
                        const next = [...prev];
                        const state = next[index];
                        if (!state) return prev;
                        next[index] = { ...state, transitionEnabled: true, dragOffsetPx: 0, dragging: false };
                        return next;
                      });
                    }
                    setEducationCarouselPaused((prev) => { const next = [...prev]; next[index] = false; return next; });
                  }}
                  onTouchCancel={() => {
                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;
                      next[index] = { ...state, transitionEnabled: true, dragOffsetPx: 0, dragging: false };
                      return next;
                    });
                    setEducationCarouselPaused((prev) => { const next = [...prev]; next[index] = false; return next; });
                  }}
                >
                  {(() => {
                    const images = educationGalleryImages[index] ?? ["/images/portrait.jpeg"];
                    const loopedImages = images.length > 1 ? [...images, ...images, ...images] : images;
                    const carouselState = mobileCarouselStates[index] ?? {
                      logicalIndex: 0,
                      trackIndex: images.length,
                      transitionEnabled: true,
                      dragOffsetPx: 0,
                      dragging: false,
                    };
                    const rawTrackIndex = carouselState.trackIndex;
                    const maxRenderableIndex = Math.max(loopedImages.length - 1, 0);
                    const trackIndex = Math.min(Math.max(rawTrackIndex, 0), maxRenderableIndex);
                    const transitionEnabled = carouselState.transitionEnabled;
                    const dragOffsetPx = carouselState.dragOffsetPx;
                    const isDragging = carouselState.dragging;
                    return (
                      <div
                        className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                        onTransitionEnd={() => handleMobileTrackTransitionEnd(index, images.length)}
                      >
                        <div
                          className="flex h-full"
                          style={{
                            transform: `translateX(calc(-${trackIndex * 100}% + ${dragOffsetPx}px))`,
                            transition: !isDragging && transitionEnabled ? "transform 500ms ease-out" : "none",
                          }}
                        >
                          {loopedImages.map((src, imageIndex) => (
                            <div key={`${entry.institution}-mobile-track-${imageIndex}`} className="relative h-full w-full shrink-0">
                              <Image
                                src={src}
                                alt={`${entry.institution} mobile gallery image ${imageIndex + 1}`}
                                fill
                                sizes="(max-width: 1023px) 100vw, 0px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Desktop carousel */}
                <div
                  className="relative hidden lg:flex lg:flex-col"
                  onMouseEnter={() => { setEducationCarouselPaused((prev) => { const next = [...prev]; next[index] = true; return next; }); }}
                  onMouseLeave={() => { setEducationCarouselPaused((prev) => { const next = [...prev]; next[index] = false; return next; }); }}
                >
                  {(() => {
                    const images = educationGalleryImages[index] ?? ["/images/portrait.jpeg"];
                    const carouselState = educationCarouselStates[index] ?? {
                      current: 0,
                      previous: null,
                      direction: 1 as const,
                      animating: false,
                    };
                    const currentSrc = images[carouselState.current] ?? images[0];
                    const previousSrc = carouselState.previous !== null ? (images[carouselState.previous] ?? images[0]) : null;
                    return (
                      <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        {previousSrc && carouselState.animating && (
                          <Image
                            key={`${entry.institution}-previous-${carouselState.previous}`}
                            src={previousSrc}
                            alt={`${entry.institution} desktop gallery image ${(carouselState.previous ?? 0) + 1}`}
                            fill
                            sizes="416px"
                            className="object-cover"
                            style={{
                              animation: carouselState.direction === 1 ? "education-slide-out-left 450ms ease forwards" : "education-slide-out-right 450ms ease forwards",
                            }}
                          />
                        )}
                        <Image
                          key={`${entry.institution}-current-${carouselState.current}`}
                          src={currentSrc}
                          alt={`${entry.institution} desktop gallery image ${carouselState.current + 1}`}
                          fill
                          sizes="416px"
                          className="object-cover"
                          style={{
                            animation: carouselState.animating
                              ? carouselState.direction === 1
                                ? "education-slide-in-right 450ms ease forwards"
                                : "education-slide-in-left 450ms ease forwards"
                              : undefined,
                          }}
                        />
                      </div>
                    );
                  })()}

                  <button
                    type="button"
                    onClick={() => showPrevImage(index)}
                    className="absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-700 shadow-sm opacity-50 transition hover:bg-white/70 hover:opacity-80"
                    aria-label={`Show previous image for ${entry.institution}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => showNextImage(index)}
                    className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-700 shadow-sm opacity-50 transition hover:bg-white/70 hover:opacity-80"
                    aria-label={`Show next image for ${entry.institution}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes education-slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes education-slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes education-slide-out-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes education-slide-out-right {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
