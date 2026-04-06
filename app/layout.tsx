import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footbar";
import { CartProvider } from "./context/CartContext";

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
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
