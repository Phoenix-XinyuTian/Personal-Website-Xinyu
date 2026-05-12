import { NextResponse } from "next/server";

export interface YoutubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}

const CHANNEL_HANDLE = "Phoenix_Tian";
const MAX_RESULTS = 10;

async function fetchJson(url: string) {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    // Step 1: get uploads playlist ID from channel handle
    const channelData = await fetchJson(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`
    );

    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // Step 2: get latest videos from uploads playlist
    const playlistData = await fetchJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${MAX_RESULTS}&key=${apiKey}`
    );

    const videoIds: string[] = playlistData.items.map(
      (item: { snippet: { resourceId: { videoId: string } } }) =>
        item.snippet.resourceId.videoId
    );

    // Step 3: get view counts and durations
    const statsData = await fetchJson(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(",")}&key=${apiKey}`
    );

    const statsMap: Record<string, { viewCount: string; duration: string }> = {};
    for (const item of statsData.items) {
      statsMap[item.id] = {
        viewCount: item.statistics?.viewCount ?? "0",
        duration: item.contentDetails?.duration ?? "",
      };
    }

    const videos: YoutubeVideo[] = playlistData.items.map(
      (item: {
        snippet: {
          resourceId: { videoId: string };
          title: string;
          publishedAt: string;
          thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } };
        };
      }) => {
        const videoId = item.snippet.resourceId.videoId;
        const thumbnails = item.snippet.thumbnails;
        return {
          id: videoId,
          title: item.snippet.title,
          thumbnail:
            thumbnails.maxres?.url ??
            thumbnails.high?.url ??
            thumbnails.medium?.url ??
            "",
          publishedAt: item.snippet.publishedAt,
          viewCount: statsMap[videoId]?.viewCount ?? "0",
          duration: formatDuration(statsMap[videoId]?.duration ?? ""),
        };
      }
    );

    return NextResponse.json({ videos });
  } catch (err) {
    console.error("YouTube API fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = parseInt(match[1] ?? "0");
  const m = parseInt(match[2] ?? "0");
  const s = parseInt(match[3] ?? "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
