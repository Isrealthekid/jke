import type { Metadata } from "next";
import { Bowlby_One, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MenuProvider } from "@/components/layout/MenuContext";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import CustomCursor from "@/components/layout/CustomCursor";
import ThemeToggle from "@/components/layout/ThemeToggle";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";
import LoadingScreen from "@/components/layout/LoadingScreen";
import "./globals.css";

// Headings across the whole site (Bowlby One). Body text is Inter.
const bowlbyOne = Bowlby_One({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});


const SITE = "https://thejoietv.com";
const FILMS_SITE = "https://films.thejoietv.com";

// Tells Google who and what this site is, including the other names people search for.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "The Joie TV",
      alternateName: ["Joie TV", "Joie TV Productions", "Joy Karenate-Egbuson"],
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "The Joie TV",
      alternateName: ["Joie TV", "Joie TV Productions", "JTV"],
      url: SITE,
      logo: `${SITE}/logo.png`,
      image: `${SITE}/og.png`,
      founder: { "@id": `${SITE}/#joy` },
      sameAs: [
        FILMS_SITE,
        "https://www.youtube.com/@thejoietv",
        "https://www.instagram.com/joie.egbuson/",
        "https://www.linkedin.com/in/joykarenate-egbuson/",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#joy`,
      name: "Joy Karenate-Egbuson",
      alternateName: ["Joy Egbuson", "Joie Egbuson", "Joie TV"],
      familyName: "Egbuson",
      givenName: "Joy",
      jobTitle: "Video editor, filmmaker and creative director",
      url: SITE,
      image: `${SITE}/og.png`,
      worksFor: { "@id": `${SITE}/#org` },
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      sameAs: [
        "https://www.youtube.com/@thejoietv",
        "https://www.instagram.com/joie.egbuson/",
        "https://www.linkedin.com/in/joykarenate-egbuson/",
        FILMS_SITE,
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "The Joie TV | Joy Karenate-Egbuson — Video Editor & Filmmaker in Lagos",
    template: "%s",
  },
  description:
    "Joy Karenate-Egbuson (Joy Egbuson) is a Lagos-based video editor, filmmaker and creative director behind The Joie TV (Joie TV Productions). Short films, video editing and creative direction for brands.",
  keywords: [
    "Joy Karenate-Egbuson",
    "Joy Egbuson",
    "Egbuson",
    "Joie TV",
    "The Joie TV",
    "Joie TV Productions",
    "video editor Lagos",
    "filmmaker Nigeria",
    "creative director Lagos",
  ],
  authors: [{ name: "Joy Karenate-Egbuson", url: "https://thejoietv.com" }],
  alternates: { canonical: "./" },
  metadataBase: new URL("https://thejoietv.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Joie TV",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Joie TV" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bowlbyOne.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-brand-black text-brand-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <MenuProvider>
            <SmoothScrollProvider>
              <LoadingScreen />
              <CustomCursor />
              <Navbar />
              <ThemeToggle />
              <PageTransition>
                {children}
                <SiteFooter />
              </PageTransition>
            </SmoothScrollProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
