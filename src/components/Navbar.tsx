"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import styles from './Navbar.module.css';

const Navbar = () => {
  const toggleCart = useAppStore((state) => state.toggleCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const cartCount = useAppStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const wishlistCount = useAppStore((state) => state.wishlist.length);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.iconBtn} aria-label="Menu">
            <Menu size={24} />
          </button>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={24} />
          </button>
        </div>

        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            ZAC<span className={styles.lightning}>MO</span>
          </Link>
        </div>

        <div className={styles.right}>
          <Link href="/account" className={styles.iconBtn} aria-label="Account">
            <User size={24} />
          </Link>
          <button className={styles.iconBtn} onClick={toggleWishlist} aria-label="Wishlist">
            <Heart size={24} />
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </button>
          <button className={styles.iconBtn} onClick={toggleCart} aria-label="Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
