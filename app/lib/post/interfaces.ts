export interface HeroPost {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: Date | string;
    slug?: string;
}

export interface CardCarouselProps {
    posts: HeroPost[];
    title?: string; // section title, defaults to "Latest Posts"
    viewAllHref?: string; // "View all" link, defaults to "/posts"
}