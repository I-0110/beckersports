import { redirect } from "next/navigation";
import UnsubscribeHandler from "@/app/ui/unsubscribe/unsubscribe-handler";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  if (!email || !token) redirect("/");

  return (
    <div className="min-h-screen bg-chiefs-dark">
      <div className="bg-chiefs-1 py-10 px-6 text-center">
        <h1 className="font-logo text-3xl text-chiefs-a">Becker Sports</h1>
      </div>
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <UnsubscribeHandler email={email} token={token} />
        </div>
      </div>
    </div>
  );
}