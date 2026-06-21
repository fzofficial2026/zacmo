"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAppStore, Product } from '@/lib/store';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore();
  
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page when clicking heart
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.imageContainer}>
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          style={{ objectFit: 'cover' }} 
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.viewText}>Quick View</span>
        </div>
      </Link>
      
      <button 
        className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`} 
        onClick={toggleWishlist}
        aria-label="Toggle Wishlist"
      >
        <Heart size={20} fill={isWishlisted ? "var(--color-electric-red)" : "none"} />
      </button>

      <div className={styles.info}>
        <Link href={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
