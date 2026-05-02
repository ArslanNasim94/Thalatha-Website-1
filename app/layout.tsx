import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageLoader from "@/components/ui/PageLoader";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thalatha — Premium Home Services Made Simple",
  description:
    "Connect with verified service providers through video requests. Show what you need, get instant quotes, and hire with complete confidence.",
  metadataBase: new URL("https://thalatha.app"),
  openGraph: {
    title: "Thalatha — Premium Home Services Made Simple",
    description:
      "Show exactly what you need. Get instant quotes. Hire with confidence.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0812",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
