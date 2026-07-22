import { notFound } from "next/navigation";
import { getSubscriberByToken } from "@/app/lib/actions/preferences-actions";
import { getAllCategories } from "@/app/lib/actions/category-actions";
import PreferencesForm from "./preferences-form";

export default async function PreferencesPageContent({
  token,
  email,
}: {
  token?: string;
  email?: string;
}) {
  if (!token || !email) {
    notFound();
  }

  let subscriber;
  try {
    subscriber = await getSubscriberByToken(email, token);
  } catch {
    notFound();
  }

  const categories = await getAllCategories();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 bg-chiefs-light dark:bg-chiefs-dark">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/steak.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div
        className="
          relative z-20 bg-black/60 backdrop-blur-md
          border border-chiefs-1
          shadow-[0_0_40px_4px_rgba(220,38,38,0.5)]
          p-8 rounded-2xl w-full max-w-lg
        "
      >
        <div className="mb-6">
          <h1 className="font-logo uppercase text-3xl text-chiefs-a mt-1 mb-2">
            Manage Your Email Preferences
          </h1>
          <p className="font-post-content text-sm text-chiefs-light">
            Choose which categories you&apos;d like to hear about. Update
            anytime — changes take effect immediately.
          </p>
        </div>

        <PreferencesForm
          subscriber={subscriber}
          token={token}
          categories={categories}
        />
      </div>
    </div>
  );
}