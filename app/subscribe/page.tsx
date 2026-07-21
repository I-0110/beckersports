import { db } from "@/app/lib/db";
import SubscribeForm from "@/app/ui/subscribe/subscribe-form";

export default async function SubscribePage() {
  const categories = await db.category.findMany({
    where: {
      posts: {
        some: { published: true },
      },
    },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });

  return (
    <div className="min-h-screen bg-chiefs-dark">
      {/* Hero */}
      <div className="bg-chiefs-1 py-16 px-6 text-center">
        <h1 className="font-logo text-4xl lg:text-5xl text-chiefs-a mb-3">
          Stay in the game
        </h1>
        <p className="font-post-content text-base text-chiefs-light dark:text-chiefs-dark max-w-md mx-auto">
          Get the latest Chiefs coverage and NFL analysis delivered straight to your inbox.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <SubscribeForm categories={categories} />
        </div>
      </div>
    </div>
  );
}