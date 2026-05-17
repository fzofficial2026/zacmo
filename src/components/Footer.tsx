import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-grid">
        <div className="footer-col">
          <h3 className="nav-logo" style={{ marginBottom: "20px" }}>NXT.</h3>
          <p style={{ color: "var(--gray-text)", fontSize: "0.9rem" }}>
            The future of minimal, visually stunning streetwear.
          </p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="#">New Arrivals</Link></li>
            <li><Link href="#">Accessories</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Shipping & Returns</Link></li>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "60px", paddingTop: "20px", borderTop: "1px solid var(--border)", color: "var(--gray-text)", fontSize: "0.85rem" }}>
        &copy; {new Date().getFullYear()} NXT. All rights reserved.
      </div>
    </footer>
  );
}
