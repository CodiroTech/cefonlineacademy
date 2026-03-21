import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components/common/footer";
import "./globals.css";
import Navbar01Page from "@/components/navbar/navbar";
import { Donate } from "@/components/common/donate";
import { getSiteSettings, buildSiteSettingsData } from "@/lib/api/siteSettings";
import { getPolicies } from "@/lib/api/policies";
import { DonationProviders } from "@/context/DonationProviders";

const poppins = Poppins({
  variable: "--font-poppins", // ✅ CLEAN & CLEAR
  subsets: ["latin"],
  weight: ["400",  "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

/** Ensure metadata (including favicon from site-settings API) is computed at request time, not cached at build. */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings(0);
  const siteData = buildSiteSettingsData(settings);
  const faviconUrl = siteData.faviconUrl || "/api/favicon";

  return {
    title: {
      default: "CEF - Character Education Foundation",
      template: "%s | CEF",
    },
    description: "Character Education Foundation - Building character, developing leaders",
    keywords: ["education", "character building", "youth development", "CEF"],
    authors: [{ name: "Character Education Foundation" }],
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: faviconUrl, sizes: "any" },
        { url: faviconUrl, sizes: "256x256", type: "image/png" },
      ],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, policies] = await Promise.all([
    getSiteSettings(0), // no cache so footer/favicon from API are fresh
    getPolicies(0),
  ]);
  const siteData = buildSiteSettingsData(settings);

  const navbarData = {
    "header-logo": siteData["header-logo"],
    "facebook-url": siteData["facebook-url"],
    "insta-url": siteData["insta-url"],
    "youtube-url": siteData["youtube-url"],
    "linkedin-url": siteData["linkedin-url"],
    "portal-url": siteData["portal-url"],
  };

  const footerData = {
    "header-logo": siteData["header-logo"],
    "footer-logo": siteData["footer-logo"],
    "footer-cef-logo": siteData["footer-cef-logo"],
    "facebook-url": siteData["facebook-url"],
    "insta-url": siteData["insta-url"],
    "youtube-url": siteData["youtube-url"],
    "linkedin-url": siteData["linkedin-url"],
    "footer-text": siteData["footer-text"],
    "footer-cef-text": siteData["footer-cef-text"],
    policies: policies.map((p) => ({ id: p.id, title: p.title })),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased bg-white`}>
        <DonationProviders>
          <Navbar01Page data={navbarData} />
          {children}
          <Donate />
          <Footer data={footerData} />
        </DonationProviders>
      </body>
    </html>
  );
}
