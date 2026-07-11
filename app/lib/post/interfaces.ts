import { Post, Category } from "@prisma/client";

export interface HeroPost {
  id: string;
  title: string;
  content: string;
  category: { id: string; name: string; slug: string } | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  slug: string;
}

export interface CardCarouselProps {
    posts: HeroPost[];
    title?: string; // section title, defaults to "Latest Posts"
    viewAllHref?: string; // "View all" link, defaults to "/posts"
}

export interface StatCardsProps {
    total: number;
    published: number;
    drafts: number;
}

type PostWithCategory = Post & { category: Category | null};

export interface PostTableProps {
    posts: PostWithCategory[];
}

export interface PostHeaderProps {
    title: string;
    content: string;
    publishedAt: Date | null;
    createdAt: Date;
    category: {
        id: string;
        name: string;
        slug: string;
    } | null;
}

interface NextPost {
    title: string;
    slug: string;
}

interface RelatedPost {
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
}

export interface PostFooterProps {
    prev: NextPost | null;
    next: NextPost | null;
    related: RelatedPost[];
}

export interface CategoryPostProps {
    posts: HeroPost[];
    categoryName: string;
    currentPage: number;
    totalPages: number;
    slug: string;
}


export interface Categories {
  name: string;
  slug: string;
}

export interface NavProps {
  categories: Categories[];
}

export interface SubscribeFormProps {
    onSuccess?: () => void;
    categories: Categories[];
}

export interface Subscriber {
  name: string;
  email: string;
  categories: string[];
}

export interface PreferencesFormProps {
  subscriber: Subscriber;
  token: string;
  availableCategories: Categories[];
}

export interface PreferencesLoaderProps {
  email: Subscriber["email"];
  token: string;
  availableCategories: Categories[];
}

