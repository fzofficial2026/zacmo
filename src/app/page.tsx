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
            DEFINE YOUR<br />FUTURE.
          </h1>
          <p className="hero-subtitle">
            Experience our new collection in full interactive 3D. 
            Built for the modern world.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link href="#featured" className="btn-secondary">
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="section container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Featured Drops</h2>
            <p style={{ color: "var(--gray-text)" }}>Curated pieces for your everyday rotation.</p>
          </div>
          <Link href="/products" style={{ fontWeight: 600, borderBottom: "1px solid var(--white-text)" }}>
            View All
          </Link>
        </div>

        <div className="product-grid">
          {/* Featured Product Mocks */}
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
                <h3 className="product-title">NXT Minimal Hoodie</h3>
                <p className="product-price">$85.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "20px" }}>Join the Movement</h2>
          <p style={{ color: "var(--gray-text)", marginBottom: "40px" }}>
            Subscribe to get early access to drops and exclusive 3D digital wearables.
          </p>
          <form style={{ display: "flex", gap: "12px" }}>
            <input type="email" placeholder="Enter your email" className="input-field" style={{ margin: 0 }} />
            <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
