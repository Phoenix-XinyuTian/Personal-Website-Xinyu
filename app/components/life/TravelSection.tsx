"use client";

import Image from "next/image";
import maplibregl, { type Marker } from "maplibre-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Camera, ChevronLeft, ChevronRight, MapPin, Minus, Plus, Star } from "lucide-react";
import { type SiteLanguage } from "../../types";
import { travelTrips, visitedPlaces, type TravelTrip, type VisitedPlace } from "../../data/travel";

const depthStyles: Record<VisitedPlace["depth"], string> = {
  deep: "bg-emerald-500 ring-emerald-200",
  visited: "bg-sky-500 ring-sky-200",
  transit: "bg-amber-400 ring-amber-100",
};

const depthLabels: Record<SiteLanguage, Record<VisitedPlace["depth"], string>> = {
  en: {
    deep: "Deep stay",
    visited: "Visited",
    transit: "Transit",
  },
  zh: {
    deep: "深度停留",
    visited: "已到访",
    transit: "路过/转机",
  },
};

function getCopy(lang: SiteLanguage) {
  return {
    eyebrow: "TRAVEL",
    heading: lang === "zh" ? "Travel Atlas" : "Travel Atlas",
    description:
      lang === "zh"
        ? "一张会逐步点亮的二维世界地图，连接每一次旅行的照片、城市和文字记录。现在使用真实可拖拽缩放的地图底座，后续可以平滑接入 Notion。"
        : "A 2D world map that lights up with every chapter, connecting destinations, photo albums, and reflective travel notes. It now uses a real pannable map base and is ready for a future Notion source.",
    visitedCountries: lang === "zh" ? "国家/地区" : "countries & regions",
    cityChapters: lang === "zh" ? "旅行相册" : "travel albums",
    continents: lang === "zh" ? "大洲" : "continents",
    latest: lang === "zh" ? "最近更新" : "latest chapter",
    mapMode: lang === "zh" ? "真实交互地图" : "Interactive Map",
    zoomOut: lang === "zh" ? "缩小地图" : "Zoom out",
    zoomIn: lang === "zh" ? "放大地图" : "Zoom in",
    atlasHint: lang === "zh" ? "点击亮点查看相册" : "Tap a lit place to preview its album",
    depth: lang === "zh" ? "访问深度" : "Visit depth",
    gallery: lang === "zh" ? "相册画廊" : "Album Gallery",
    photosFirst: lang === "zh" ? "照片优先" : "Photos first",
    openAlbum: lang === "zh" ? "查看相册" : "View album",
    selectedStory: lang === "zh" ? "旅行记录" : "Travel Note",
    futureReady: lang === "zh" ? "Notion 字段预留" : "Notion-ready fields",
    futureFields:
      lang === "zh"
        ? "slug、地点关联、日期、精选照片、状态、满意度和未来攻略/花销字段都可以继续扩展。"
        : "Slug, place relation, dates, selected photos, status, satisfaction, and future guide or budget fields can expand from here.",
  };
}

function statValue(label: string, value: string) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}

function WorldMap({
  lang,
  selectedPlace,
  onSelectPlace,
}: {
  lang: SiteLanguage;
  selectedPlace: VisitedPlace;
  onSelectPlace: (place: VisitedPlace) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const copy = getCopy(lang);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [94, 22],
      zoom: 1.35,
      minZoom: 1,
      maxZoom: 9,
      attributionControl: false,
    });

    mapRef.current.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution: "OpenFreeMap",
      }),
      "bottom-right",
    );

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    visitedPlaces.forEach((place) => {
      const marker = document.createElement("button");
      marker.type = "button";
      marker.title = place.name[lang];
      marker.className = "travel-map-marker";
      marker.dataset.depth = place.depth;
      marker.dataset.selected = String(place.slug === selectedPlace.slug);
      marker.addEventListener("click", () => onSelectPlace(place));

      const dot = document.createElement("span");
      dot.className = "travel-map-marker__dot";
      marker.appendChild(dot);

      const label = document.createElement("span");
      label.className = "travel-map-marker__label";
      label.textContent = place.name[lang];
      marker.appendChild(label);

      markersRef.current[place.slug] = new maplibregl.Marker({
        element: marker,
        anchor: "center",
      })
        .setLngLat([place.coordinates.lng, place.coordinates.lat])
        .addTo(map);
    });
  }, [lang, onSelectPlace, selectedPlace.slug]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(markersRef.current).forEach(([slug, marker]) => {
      const element = marker.getElement();
      element.dataset.selected = String(slug === selectedPlace.slug);
    });

    map.flyTo({
      center: [selectedPlace.coordinates.lng, selectedPlace.coordinates.lat],
      zoom: Math.max(map.getZoom(), selectedPlace.type === "city" ? 4 : 2.7),
      duration: 900,
      essential: true,
    });
  }, [selectedPlace]);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#eef6f6] shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <MapPin className="h-4 w-4 text-teal-600" aria-hidden="true" />
          {copy.mapMode}
        </div>
        <p className="text-sm text-slate-500">{copy.atlasHint}</p>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label={copy.zoomOut}
            onClick={() => mapRef.current?.zoomOut()}
            className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-xs font-semibold text-slate-500">Map</span>
          <button
            type="button"
            aria-label={copy.zoomIn}
            onClick={() => mapRef.current?.zoomIn()}
            className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative h-[360px] bg-slate-100 sm:h-[430px]">
        <div ref={mapContainerRef} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />
      </div>

      <div className="grid gap-3 border-t border-slate-200 bg-white p-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-lg font-semibold text-slate-950">{selectedPlace.name[lang]}</p>
          <p className="mt-1 text-sm text-slate-500">
            {selectedPlace.continent[lang]} · {selectedPlace.code} · {selectedPlace.firstVisited}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className={`h-2.5 w-2.5 rounded-full ${depthStyles[selectedPlace.depth].split(" ")[0]}`} />
          {copy.depth}: {depthLabels[lang][selectedPlace.depth]}
        </div>
      </div>
    </div>
  );
}

function AlbumCard({
  trip,
  lang,
  isSelected,
  onSelect,
}: {
  trip: TravelTrip;
  lang: SiteLanguage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const copy = getCopy(lang);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-[285px] shrink-0 snap-start overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:w-[340px] ${
        isSelected ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={trip.cover}
          alt={trip.title[lang]}
          fill
          sizes="(min-width: 640px) 340px, 285px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {trip.dateRange[lang]}
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-slate-950">{trip.title[lang]}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
          {trip.city[lang]}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{trip.summary[lang]}</p>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
          <span>{copy.openAlbum}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

export default function TravelSection({ lang }: { lang: SiteLanguage }) {
  const [selectedTripSlug, setSelectedTripSlug] = useState(travelTrips[0]?.slug ?? "");
  const copy = getCopy(lang);
  const publishedTrips = useMemo(() => travelTrips.filter((trip) => trip.status === "published"), []);
  const selectedTrip = publishedTrips.find((trip) => trip.slug === selectedTripSlug) ?? publishedTrips[0];
  const selectedPlace = visitedPlaces.find((place) => place.slug === selectedTrip.placeSlug) ?? visitedPlaces[0];
  const continentsCount = new Set(visitedPlaces.map((place) => place.continent.en)).size;
  const latestTrip = publishedTrips[0];

  const handleSelectPlace = useCallback((place: VisitedPlace) => {
    const placeTrip = publishedTrips.find((trip) => trip.placeSlug === place.slug);
    if (placeTrip) setSelectedTripSlug(placeTrip.slug);
  }, [publishedTrips]);

  return (
    <section id="travel" className="scroll-mt-24 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">{copy.eyebrow}</p>
            <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{copy.heading}</h2>
            <p className="mx-auto mt-5 max-w-5xl text-base leading-8 text-slate-600">{copy.description}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statValue(copy.visitedCountries, String(visitedPlaces.length))}
            {statValue(copy.cityChapters, String(publishedTrips.length))}
            {statValue(copy.continents, String(continentsCount))}
            {statValue(copy.latest, latestTrip.city[lang])}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.36fr_0.64fr]">
          <WorldMap lang={lang} selectedPlace={selectedPlace} onSelectPlace={handleSelectPlace} />

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{copy.selectedStory}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{selectedTrip.title[lang]}</h3>
              </div>
              <div className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                {selectedTrip.satisfaction}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTrip.tags.map((tag) => (
                <span key={tag.en} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {tag[lang]}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">{selectedTrip.reflection[lang]}</p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {selectedTrip.photos.map((photo, index) => (
                <div key={photo} className={`relative overflow-hidden rounded-md bg-slate-100 ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                  <Image
                    src={photo}
                    alt={`${selectedTrip.title[lang]} ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 160px, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CalendarDays className="h-4 w-4 text-teal-600" aria-hidden="true" />
                {copy.futureReady}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy.futureFields}</p>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3">
            <Camera className="h-5 w-5 text-teal-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{copy.gallery}</p>
              <p className="mt-1 text-sm text-slate-500">{copy.photosFirst}</p>
            </div>
            <div className="ml-auto hidden gap-2 sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-500">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-500">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto pb-3">
            <div className="flex w-max snap-x gap-4 pr-6">
              {publishedTrips.map((trip) => (
                <AlbumCard
                  key={trip.slug}
                  trip={trip}
                  lang={lang}
                  isSelected={trip.slug === selectedTrip.slug}
                  onSelect={() => setSelectedTripSlug(trip.slug)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
