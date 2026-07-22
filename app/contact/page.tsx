import ContactPageContent from "@/app/ui/contact/contactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Becker Sports",
  description: "Get in touch with Becker Sports — tips, corrections, or partnership inquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}