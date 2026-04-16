import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MenuProvider } from "@/components/layout/MenuContext";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import ThemeToggle from "@/components/layout/ThemeToggle";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";
import LoadingScreen from "@/components/layout/LoadingScreen";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JK Egbuson — Social Media, Video & Film",
    template: "%s",
  },
  description:
    "Lagos-based social media manager, video editor, and filmmaker crafting visual stories for brands and individuals.",
  metadataBase: new URL("https://jkegbuson.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JK Egbuson",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jkegbuson",
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
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-brand-black text-brand-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <MenuProvider>
            <SmoothScrollProvider>
              <LoadingScreen />
              <CustomCursor />
              <Navbar />
              <ThemeToggle />
              <PageTransition>{children}</PageTransition>
            </SmoothScrollProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
