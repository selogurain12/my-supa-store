import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footbar";
import { ABTestDisplay } from "@/components/ABTestDebug";
import Providers from "./providers";

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
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ABTestDisplay />
        </Providers>
      </body>
    </html>
  );
}
