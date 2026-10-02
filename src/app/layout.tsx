import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fruit Storm! — Sweet Match 3",
  description:
    "Eşleştir · Zincirle · Yıldızları topla! Fruit Storm, 8 dilli meyve eşleştirme (match-3) oyunu.",
  keywords: [
    "Fruit Storm",
    "match 3",
    "meyve patlat",
    "oyun",
    "puzzle",
    "sweet match 3",
  ],
  authors: [{ name: "GNC" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Fruit Storm! — Sweet Match 3",
    description: "Eşleştir · Zincirle · Yıldızları topla!",
    siteName: "Fruit Storm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fruit Storm! — Sweet Match 3",
    description: "Eşleştir · Zincirle · Yıldızları topla!",
  },
};

export const viewport: Viewport = {
  themeColor: "#5E2F8F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
