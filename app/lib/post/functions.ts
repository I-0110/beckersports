import { CategoryConfig } from "./category-data";

export function readTime(content: string): number {
    return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

export function excerpt(content: string, maxLength = 150): string {
    const plain = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    return plain.length > maxLength 
        ? plain.substring(0, maxLength) + '...' 
        : plain
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(date));
}

export function getCategoryConfig(category: string) {
    return CategoryConfig[category.toLowerCase()] ?? {
        label: category,
        bg: "bg-chiefs-1",
        description: ""
    };
}