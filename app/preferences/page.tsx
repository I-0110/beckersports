import PreferencesPageContent from "@/app/ui/preferences/preferences-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Preferences | Becker Sports",
};

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string; }>;
}) {
  const { token, email } = await searchParams;

  return <PreferencesPageContent token={token} email={email} />;
}