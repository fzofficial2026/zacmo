import React from 'react';
import Link from 'next/link';
// Removed lucide social icons to fix build
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              ZAC<span className={styles.lightning}>MO</span>
            </Link>
            <p className={styles.tagline}>
              The future of streetwear. Premium quality, electric style. Unapologetically bold.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">TW</a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">FB</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
            </div>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Shop</h4>
              <Link href="/collections/all">All Products</Link>
              <Link href="/collections/new">New Arrivals</Link>
              <Link href="/custom-designer">Custom Designer</Link>
              <Link href="/collections/accessories">Accessories</Link>
            </div>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Support</h4>
              <Link href="/faq">FAQ</Link>
              <Link href="/shipping">Shipping & Returns</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/size-guide">Size Guide</Link>
            </div>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Legal</h4>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} ZACMO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
