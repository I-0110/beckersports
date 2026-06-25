import { YouTubeVideo } from "./interfaces";

export function decodeXML(str: string) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

export async function fetchLatestVideos(channelId: string, limit = 10): Promise<YouTubeVideo[]> {
    try {
        const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
        { next: { revalidate: 3600 } }
        )

        const xml     = await res.text()
        const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? []

        return entries.slice(0, limit).map(entry => {
            const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? '';

            const title = entry.match(/<title>(.*?)<\/title>/)?.[1] ?? '';

            const description = entry.match(/<media:description>(.*?)<\/media:description>/)?.[1] ?? '';

            const thumbnailUrl = entry.match(/<media:thumbnail url="(.*?)"/)?.[1] ?? '';

            const publishedAt = new Date(entry.match(/<published>(.*?)<\/published>/)?.[1] ?? '');

            const href = `https://www.youtube.com/watch?v=${videoId}`;

            return {
                id: videoId,
                title: decodeXML(title),
                description: decodeXML(description),
                thumbnailUrl: thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                publishedAt: publishedAt,
                href: href
            };
        });
    } catch (error) {
        console.error('Error fetching latest videos:', error);
        return [];
    }
}