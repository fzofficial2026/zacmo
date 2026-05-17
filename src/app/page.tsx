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
        <div className="diagonal-divider-bottom"></div>
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--white-text)" }}>UNLEASH</span><br />
            THE <span style={{ color: "var(--accent)" }}>POWER.</span>
          </h1>
          <p className="hero-subtitle">
            Engineered for the fearless. ZACMO blends high-tech performance with aggressive streetwear aesthetics. 
            Step into the new era.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/products" className="btn-accent">
              Shop Collection
            </Link>
            <Link href="#featured" className="btn-secondary">
              View Drops
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="section container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", borderBottom: "2px solid var(--border)", paddingBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: 800 }}>LATEST DROPS</h2>
            <p style={{ color: "var(--gray-text)", fontFamily: "var(--font-main)" }}>High-voltage threads for the urban grid.</p>
          </div>
          <Link href="/products" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
            View All &rarr;
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
      
      <section className="section" style={{ backgroundColor: "var(--black-card)", position: "relative" }}>
        <div className="diagonal-divider-top"></div>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px", padding: "80px 0" }}>
          <h2 style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "24px" }}>
            JOIN THE <span style={{ color: "var(--accent)" }}>MOVEMENT</span>
          </h2>
          <p style={{ color: "var(--gray-text)", marginBottom: "48px", fontFamily: "var(--font-main)", fontSize: "1.2rem" }}>
            Get early access to exclusive drops, experimental gear, and the ZACMO digital underground.
          </p>
          <form style={{ display: "flex", gap: "16px", justifyContent: "center", maxWidth: "500px", margin: "0 auto" }}>
            <input type="email" placeholder="ENTER YOUR EMAIL" className="input-field" style={{ margin: 0, flexGrow: 1 }} required />
            <button type="submit" className="btn-accent" style={{ whiteSpace: "nowrap" }}>
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
