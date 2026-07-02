import type { Metadata } from "next";
import { Tourney, Caveat, Lora } from "next/font/google";
import "./globals.css";
import Providers from "./ui/providers";
import NavWrapper from "@/app/ui/nav-wrapper";

const tourneyBold = Tourney({
  variable: "--font-tourney-bold",
  weight: '700',
  subsets: ["latin"],
});

const tourneyRegular = Tourney({
  variable: "--font-tourney-regular",
  weight: '400',
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: '400',
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Becker Sports | My Football Blog",
  description: "From a Chiefs fan to another football fan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tourneyBold.variable} ${tourneyRegular.variable} ${caveat.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <NavWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
