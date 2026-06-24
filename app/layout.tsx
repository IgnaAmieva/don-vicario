import type { Metadata, Viewport } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://donvicario.vercel.app"),
  title: "Don Vicario — Edición Limitada",
  description:
    "Vino Malbec de edición limitada del Valle de Tunuyán, Mendoza. Producción artesanal argentina de alta gama.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Don Vicario — Edición Limitada",
    description:
      "Malbec artesanal del Valle de Tunuyán, Mendoza. Producción limitada.",
    url: "/",
    siteName: "Don Vicario",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${raleway.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
