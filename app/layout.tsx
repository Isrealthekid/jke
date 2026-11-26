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

export const metadata: Metadata = {
  title: {
    default: "The Joie TV — Video Editing & Film",
    template: "%s",
  },
  description:
    "Lagos-based video editor and filmmaker crafting visual stories for brands and individuals.",
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
