interface PostContentProps {
    content: string;
}

export default function PostContent({ content }: PostContentProps) {
    return (
    <div
      className="font-post-content prose prose-lg max-w-none
        prose-headings:font-logo prose-headings:text-chiefs-dark dark:prose-headings:text-chiefs-light
        prose-p:text-chiefs-2 dark:prose-p:text-chiefs-4 prose-p:leading-relaxed
        prose-a:text-chiefs-1 dark:prose-a:text-chiefs-a prose-a:underline hover:prose-a:brightness-125
        prose-strong:text-chiefs-dark dark:prose-strong:text-chiefs-light
        prose-ul:text-chiefs-2 dark:prose-ul:text-chiefs-4 prose-ol:text-chiefs-4 dark:prose-ol:text-chiefs-4
        prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}