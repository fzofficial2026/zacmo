"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="ZACMO Logo" style={{ height: "36px", objectFit: "contain", mixBlendMode: "screen" }} />
        </Link>
        <div className="nav-links">
          <Link href="/products">Shop</Link>
          <Link href="#">Collections</Link>
          <Link href="#">About</Link>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button onClick={toggleCart} className="nav-cart-btn" style={{ border: "none", cursor: "pointer" }}>
            <ShoppingBag size={24} />
            {mounted && cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
