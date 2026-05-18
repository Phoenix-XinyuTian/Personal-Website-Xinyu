import type { SiteLanguage } from "../types";

export type TravelText = Record<SiteLanguage, string>;

export type VisitedPlace = {
  slug: string;
  name: TravelText;
  code: string;
  type: "country" | "region" | "city";
  continent: TravelText;
  depth: "deep" | "visited" | "transit";
  firstVisited: string;
  lastVisited: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapLabelOffset?: {
    x: number;
    y: number;
  };
};

export type TravelTrip = {
  slug: string;
  title: TravelText;
  placeSlug: string;
  city: TravelText;
  dateRange: TravelText;
  summary: TravelText;
  reflection: TravelText;
  tags: TravelText[];
  cover: string;
  photos: string[];
  status: "published" | "draft";
  featured: boolean;
  satisfaction: number;
};

export const visitedPlaces: VisitedPlace[] = [
  {
    slug: "singapore",
    name: { en: "Singapore", zh: "新加坡" },
    code: "SG",
    type: "country",
    continent: { en: "Asia", zh: "亚洲" },
    depth: "deep",
    firstVisited: "2023-07",
    lastVisited: "2026-05",
    coordinates: { lat: 1.3521, lng: 103.8198 },
    mapLabelOffset: { x: 1.3, y: 5 },
  },
  {
    slug: "japan",
    name: { en: "Japan", zh: "日本" },
    code: "JP",
    type: "country",
    continent: { en: "Asia", zh: "亚洲" },
    depth: "visited",
    firstVisited: "2024-11",
    lastVisited: "2024-11",
    coordinates: { lat: 36.2048, lng: 138.2529 },
  },
  {
    slug: "hong-kong",
    name: { en: "Hong Kong", zh: "中国香港" },
    code: "HK",
    type: "region",
    continent: { en: "Asia", zh: "亚洲" },
    depth: "visited",
    firstVisited: "2024-01",
    lastVisited: "2024-01",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    mapLabelOffset: { x: -7, y: 5 },
  },
  {
    slug: "china",
    name: { en: "China", zh: "中国内地" },
    code: "CN",
    type: "country",
    continent: { en: "Asia", zh: "亚洲" },
    depth: "deep",
    firstVisited: "2003-01",
    lastVisited: "2025-08",
    coordinates: { lat: 30.5728, lng: 104.0668 },
  },
];

export const travelTrips: TravelTrip[] = [
  {
    slug: "singapore-study-life",
    title: { en: "Singapore Study Life", zh: "新加坡留学生活" },
    placeSlug: "singapore",
    city: { en: "Singapore", zh: "新加坡" },
    dateRange: { en: "2025 - Now", zh: "2025 至今" },
    summary: {
      en: "Campus days, city walks, late meals, and the slow process of turning a new place into home.",
      zh: "校园、城市漫步、夜晚的食物，以及把异乡慢慢过成生活的过程。",
    },
    reflection: {
      en: "This album is designed as the living archive of my Singapore chapter: daily light, study rhythm, friendships, and the first coordinates of a larger world map.",
      zh: "这个相册会作为我新加坡篇章的长期档案：日常光线、学习节奏、朋友，以及更大世界地图的第一个坐标。",
    },
    tags: [
      { en: "Campus", zh: "校园" },
      { en: "City walk", zh: "城市漫步" },
      { en: "Daily life", zh: "日常" },
    ],
    cover: "/images/1.jpg",
    photos: ["/images/1.jpg", "/images/3.jpeg", "/images/16.jpeg"],
    status: "published",
    featured: true,
    satisfaction: 5,
  },
  {
    slug: "tokyo-visual-notes",
    title: { en: "Tokyo Visual Notes", zh: "东京视觉笔记" },
    placeSlug: "japan",
    city: { en: "Tokyo, Japan", zh: "日本东京" },
    dateRange: { en: "Nov 2024", zh: "2024 年 11 月" },
    summary: {
      en: "A compact city chapter for textures, stations, bookstores, night streets, and small visual details.",
      zh: "一段关于城市肌理、车站、书店、夜晚街道和细节观察的短篇旅行。",
    },
    reflection: {
      en: "Tokyo feels like a city that rewards slow attention. The first version of this album keeps the photos upfront, with room for routes and guide notes later.",
      zh: "东京像是一座奖励慢慢观察的城市。这个相册第一版先让照片站到前面，后续可以继续加入路线和攻略笔记。",
    },
    tags: [
      { en: "Japan", zh: "日本" },
      { en: "Street", zh: "街头" },
      { en: "Visual diary", zh: "视觉日记" },
    ],
    cover: "/images/11.jpeg",
    photos: ["/images/11.jpeg", "/images/12.jpeg", "/images/14.jpeg"],
    status: "published",
    featured: true,
    satisfaction: 5,
  },
  {
    slug: "hong-kong-weekend",
    title: { en: "Hong Kong Weekend", zh: "香港周末" },
    placeSlug: "hong-kong",
    city: { en: "Hong Kong", zh: "中国香港" },
    dateRange: { en: "Jan 2024", zh: "2024 年 1 月" },
    summary: {
      en: "A short, dense city trip built around transit, skyline, food, and familiar language in a fast-moving place.",
      zh: "一次短而密集的城市旅行：交通、天际线、食物，以及快速城市里熟悉的语言感。",
    },
    reflection: {
      en: "This entry is a good candidate for a future guide format: neighborhoods, walking routes, food notes, and a simple budget recap.",
      zh: "这一篇很适合未来扩展成攻略格式：街区、步行路线、美食记录和简单花销复盘。",
    },
    tags: [
      { en: "Weekend", zh: "周末" },
      { en: "Food", zh: "美食" },
      { en: "City", zh: "城市" },
    ],
    cover: "/images/13.jpeg",
    photos: ["/images/13.jpeg", "/images/15.jpeg", "/images/2.jpeg"],
    status: "published",
    featured: false,
    satisfaction: 4,
  },
];

export function projectToMapPosition(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}
