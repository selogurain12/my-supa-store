import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
