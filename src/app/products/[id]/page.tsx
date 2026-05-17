"use client";

import { use } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    return notFound();
  }

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
      <Link href="/products" style={{ color: "var(--gray-text)", marginBottom: "24px", display: "inline-block" }}>
        &larr; Back to Shop
      </Link>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", marginTop: "20px" }}>
        <div style={{ borderRadius: "0", overflow: "hidden", backgroundColor: "#111", aspectRatio: "4/5", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(10%) contrast(1.1)" }}
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px", fontFamily: "var(--font-header)", textTransform: "uppercase" }}>{product.name}</h1>
          <p style={{ fontSize: "1.5rem", color: "var(--accent)", marginBottom: "32px", fontFamily: "var(--font-header)", fontWeight: 700 }}>
            ${product.price.toFixed(2)}
          </p>
          
          <p style={{ lineHeight: 1.8, marginBottom: "40px", color: "#ddd", fontFamily: "var(--font-main)" }}>
            {product.description}
          </p>
          
          <button 
            className="btn-accent" 
            style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }}
            onClick={() => {
              addToCart(product);
              alert("Added to cart!");
            }}
          >
            ADD TO CART
          </button>
          
          <div style={{ marginTop: "40px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
            <p style={{ color: "var(--gray-text)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ color: "var(--success)" }}>●</span> In Stock, ready to ship
            </p>
            <p style={{ color: "var(--gray-text)", fontSize: "0.9rem" }}>
              Free shipping on orders over $150
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
