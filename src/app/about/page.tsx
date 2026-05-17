import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: "180px", paddingBottom: "120px", maxWidth: "800px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <img src="/logo.png" alt="ZACMO Logo" style={{ height: "60px", objectFit: "contain", mixBlendMode: "screen", margin: "0 auto 40px" }} />
        <h1 style={{ fontSize: "3rem", fontWeight: 400, letterSpacing: "-0.02em" }}>About Us</h1>
      </div>
      
      <div style={{ fontSize: "1.15rem", color: "var(--gray-text)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "32px" }}>
        <p>
          <span style={{ color: "var(--white-text)", fontWeight: 500 }}>ZACMO</span> was born from a desire to bridge the gap between high-performance technical apparel and the raw energy of underground streetwear.
        </p>
        <p>
          We believe clothing is not just fabric, but a statement of intent. Every piece we design is meticulously engineered to provide maximum utility without sacrificing the sleek, minimalist aesthetic that defines our brand. We utilize cutting-edge materials and precision cuts to craft garments that feel as premium as they look.
        </p>
        <p>
          Our mission is simple: to redefine the modern wardrobe. Welcome to the new standard.
        </p>
        
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/products" className="btn-primary">
            Explore The Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
