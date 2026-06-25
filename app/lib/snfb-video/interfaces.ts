export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: Date | string;
    href: string;
}

export interface VideoCardProps {
    video: YouTubeVideo;
    onClick: () => void;
}

export type VideoGridProps = {
    videos: YouTubeVideo[];
}