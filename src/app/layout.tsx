import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

export const metadata: Metadata = {
  title: "ZACMO | Premium Futuristic Apparel",
  description: "Explore the future of streetwear with ZACMO. Premium quality, electric style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartDrawer />
        <WishlistDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
