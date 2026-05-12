"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { YoutubeVideo } from "../../api/youtube/route";

function formatViews(count: string, lang: "en" | "zh"): string {
  const n = parseInt(count);
  if (lang === "zh") {
    if (n >= 10000) return `${(n / 10000).toFixed(1)}万次观看`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k次观看`;
    return `${n}次观看`;
  }
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M views`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k views`;
  return `${n} views`;
}

function timeAgo(dateStr: string, lang: "en" | "zh"): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const days = Math.floor(diff / 86400);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (lang === "zh") {
    if (years > 0) return `${years}年前`;
    if (months > 0) return `${months}个月前`;
    if (days > 0) return `${days}天前`;
    return "刚刚";
  }
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (days > 0) return `${days}d ago`;
  return "today";
}

function DurationBadge({ duration, hidden }: { duration: string; hidden?: boolean }) {
  if (!duration || hidden) return null;
  return (
    <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-semibold text-white tracking-wide">
      {duration}
    </span>
  );
}

/* Subtle play hint — small pill bottom-left, appears on hover */
function PlayHint() {
  return (
    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
      <svg viewBox="0 0 10 10" fill="white" className="h-2.5 w-2.5 drop-shadow">
        <path d="M2 1.5 L8.5 5 L2 8.5 Z" />
      </svg>
      <span className="text-[10px] font-medium text-white drop-shadow tracking-wide">Play</span>
    </div>
  );
}

function HeroVideo({ video, lang }: { video: YoutubeVideo; lang: "en" | "zh" }) {
  const [showPreview, setShowPreview] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowPreview(true), 500);
  };
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowPreview(false);
  };

  return (
    <div className="group flex flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-video">
        {/* Thumbnail */}
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className={`object-cover transition-all duration-500 ${showPreview ? "opacity-0 scale-[1.02]" : "group-hover:scale-[1.015]"}`}
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />

        {/* iframe preview */}
        {showPreview && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
          />
        )}

        {/* Subtle dark vignette on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl pointer-events-none" />

        {!showPreview && <PlayHint />}
        <DurationBadge duration={video.duration} hidden={showPreview} />

        {/* Click overlay — always sends to YouTube */}
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={video.title}
        />
      </div>

      <div className="mt-3 px-0.5">
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-2 text-base font-semibold text-slate-900 hover:text-teal-700 transition-colors leading-snug"
        >
          {video.title}
        </a>
        <p className="mt-1.5 text-sm text-slate-400">
          {formatViews(video.viewCount, lang)} · {timeAgo(video.publishedAt, lang)}
        </p>
      </div>
    </div>
  );
}

function SideVideo({ video, lang }: { video: YoutubeVideo; lang: "en" | "zh" }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 items-start"
    >
      <div className="relative w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100 aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="144px"
        />
        <DurationBadge duration={video.duration} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="line-clamp-2 text-sm font-medium text-slate-800 group-hover:text-teal-700 transition-colors leading-snug">
          {video.title}
        </p>
        <p className="mt-1.5 text-xs text-slate-400">{formatViews(video.viewCount, lang)}</p>
        <p className="text-xs text-slate-400">{timeAgo(video.publishedAt, lang)}</p>
      </div>
    </a>
  );
}

function SkeletonHero() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="w-full aspect-video rounded-2xl bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-1/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}

function SkeletonSide() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-36 shrink-0 aspect-video rounded-xl bg-slate-200" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export default function YoutubeGallery({
  lang,
  newestLabel,
}: {
  lang: "en" | "zh";
  newestLabel: string;
}) {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/youtube")
      .then((r) => r.json())
      .then((data) => {
        if (data.videos) setVideos(data.videos);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <div className="flex-1 lg:flex-[2]"><SkeletonHero /></div>
        <div className="flex flex-col gap-5 lg:flex-1">
          <SkeletonSide /><SkeletonSide />
          <div className="border-t border-slate-100 pt-4 space-y-4"><SkeletonSide /><SkeletonSide /></div>
        </div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50/60 text-sm text-slate-400">
        {lang === "zh" ? "暂无视频" : "No videos available"}
      </div>
    );
  }

  // Top 3 by view count → featured
  const byViews = [...videos].sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount));
  const [hero, side1, side2] = byViews;
  const featuredIds = new Set([hero?.id, side1?.id, side2?.id]);

  // Latest 2 published
  const byDate = [...videos]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-6 lg:items-start">
      {/* Hero — most viewed */}
      <div className="flex-1 lg:flex-[2]">
        {hero && <HeroVideo video={hero} lang={lang} />}
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-5 lg:flex-1">
        {side1 && <SideVideo video={side1} lang={lang} />}
        {side2 && <SideVideo video={side2} lang={lang} />}

        {byDate.length > 0 && (
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-slate-400">
              {newestLabel}
            </p>
            {byDate.map((v) => (
              <SideVideo key={v.id} video={v} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
