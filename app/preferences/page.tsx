import { redirect } from "next/navigation";
import { db } from "@/app/lib/db";
import PreferencesLoader from "@/app/ui/preferences/preferences-loader";

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  if (!email || !token) redirect("/");

  const availableCategories = await db.category.findMany({
    where: { posts: { some: { published: true } } },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });

  return (
    <div className="min-h-screen bg-chiefs-dark">
      <div className="bg-chiefs-1 py-10 px-6 text-center">
        <h1 className="font-logo text-3xl text-chiefs-a">Becker Sports</h1>
        <p className="font-post-content text-sm text-chiefs-light mt-1">
          Manage your subscription preferences
        </p>
      </div>
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <PreferencesLoader
            email={email}
            token={token}
            availableCategories={availableCategories}
          />
        </div>
      </div>
    </div>
  );
}