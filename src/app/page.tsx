"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-3d-container">
          <Scene />
        </div>
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">
            The new <br />standard.
          </h1>
          <p className="hero-subtitle">
            Engineered for the fearless. ZACMO blends high-tech performance with luxury streetwear aesthetics.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/products" className="btn-primary">
              Discover Collection
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="section container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 500, letterSpacing: "0.02em" }}>Latest Arrivals</h2>
          </div>
          <Link href="/products" style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--gray-text)" }}>
            View All
          </Link>
        </div>

        <div className="product-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="product-card">
              <Link href={`/products/prod_${i}`} className="product-img-wrapper">
                <img 
                  src={`https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop`} 
                  alt="Product" 
                  className="product-img"
                />
              </Link>
              <div className="product-info">
                <h3 className="product-title">ZACMO Minimal Hoodie</h3>
                <p className="product-price">$85.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section" style={{ backgroundColor: "transparent" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px", padding: "100px 0" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 400, marginBottom: "24px", letterSpacing: "-0.02em" }}>
            Join the inner circle
          </h2>
          <p style={{ color: "var(--gray-text)", marginBottom: "48px", fontSize: "1.1rem" }}>
            Get early access to exclusive drops and experimental gear.
          </p>
          <form style={{ display: "flex", gap: "16px", justifyContent: "center", maxWidth: "500px", margin: "0 auto", flexDirection: "column" }}>
            <input type="email" placeholder="Email Address" className="input-field" style={{ margin: 0, textAlign: "center" }} required />
            <button type="submit" className="btn-primary" style={{ width: "100%" }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
