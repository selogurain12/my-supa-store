import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footbar";
import { ABTestDisplay } from "@/components/ABTestDebug";
import Providers from "./providers";
import WebVitalsLogger from "@/components/WebVitalsLogger";
import SiteNameDemo from "@/components/SiteNameDemo";

const dancingScript = localFont({
  src: [
    {
      path: "../public/fonts/DancingScript-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-dancing-script",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={dancingScript.variable}>
        <Providers>
          <SiteNameDemo />
          <Navbar />
          <WebVitalsLogger />
          <main>{children}</main>
          <Footer />
          <ABTestDisplay />
        </Providers>
      </body>
    </html>
  );
}
