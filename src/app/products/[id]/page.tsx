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
    <div className="container" style={{ paddingTop: "160px", paddingBottom: "100px" }}>
      <Link href="/products" style={{ color: "var(--gray-text)", marginBottom: "40px", display: "inline-flex", alignItems: "center", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        &larr; Back to Gear
      </Link>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "80px" }}>
        <div style={{ overflow: "hidden", backgroundColor: "var(--black-card)", aspectRatio: "3/4", borderRadius: "4px" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em" }}>{product.name}</h1>
          <p style={{ fontSize: "1.5rem", color: "var(--gray-text)", marginBottom: "40px" }}>
            ${product.price.toFixed(2)}
          </p>
          
          <p style={{ lineHeight: 1.8, marginBottom: "48px", color: "var(--white-text)", fontSize: "1.05rem", fontWeight: 300 }}>
            {product.description}
          </p>
          
          <button 
            className="btn-accent" 
            style={{ width: "100%" }}
            onClick={() => {
              addToCart(product);
              alert("Added to cart!");
            }}
          >
            ADD TO CART
          </button>
          
          <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
            <p style={{ color: "var(--gray-text)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--success)" }}></span> 
              In Stock, ready to ship
            </p>
            <p style={{ color: "var(--gray-text)", fontSize: "0.9rem", paddingLeft: "20px" }}>
              Free expedited shipping on orders over $150
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
