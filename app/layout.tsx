import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components/common/footer";
import "./globals.css";
import Navbar01Page from "@/components/navbar/navbar";
import { Donate } from "@/components/common/donate";
import { getSiteSettings, buildSiteSettingsData } from "@/lib/api/siteSettings";
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

/** Encode URL so spaces in path work (e.g. "CEF Logo-01.png" from site-settings). */
function encodedFaviconUrl(url: string): string {
  const u = url.trim();
  if (!u.startsWith("http")) return u;
  try {
    const parsed = new URL(u);
    parsed.pathname = parsed.pathname
      .split("/")
      .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
      .join("/");
    return parsed.toString();
  } catch {
    return u;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings(0);
  const data = buildSiteSettingsData(settings);
  const faviconUrl = data.faviconUrl || "";
  const iconUrl =
    faviconUrl.startsWith("http") ? encodedFaviconUrl(faviconUrl) : faviconUrl;

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
      icon: iconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings(0); // no cache so footer/favicon from API are fresh
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
