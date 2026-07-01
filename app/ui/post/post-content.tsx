interface PostContentProps {
    content: string;
}

export default function PostContent({ content }: PostContentProps) {
    return (
    <div
      className="font-post-content prose prose-lg max-w-none
        prose-headings:font-logo prose-headings:text-chiefs-dark
        prose-p:text-chiefs-2 prose-p:leading-relaxed
        prose-a:text-chiefs-1 prose-a:underline hover:prose-a:brightness-125
        prose-strong:text-chiefs-dark
        prose-ul:text-chiefs-2 prose-ol:text-chiefs-2
        prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}