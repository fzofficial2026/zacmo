"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import Drawer from './Drawer';
import { Trash2, ShoppingCart } from 'lucide-react';
import styles from './CartDrawer.module.css'; // Reusing some cart styles

const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, toggleWishlist, removeFromWishlist, addToCart } = useAppStore();

  const handleAddToCart = (item: any) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  return (
    <Drawer
      isOpen={isWishlistOpen}
      onClose={toggleWishlist}
      title={`Wishlist (${wishlist.length})`}
      position="right"
    >
      {wishlist.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Your wishlist is empty.</p>
          <button className="btn-secondary" onClick={toggleWishlist} style={{ marginTop: '2rem' }}>
            Discover Products
          </button>
        </div>
      ) : (
        <div className={styles.cartItems}>
          {wishlist.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <Link href={`/product/${item.id}`} onClick={toggleWishlist} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <button onClick={() => removeFromWishlist(item.id)} className={styles.removeBtn} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <p className={styles.itemPrice} style={{ marginTop: '0.5rem', marginBottom: 'auto' }}>
                  ${item.price.toFixed(2)}
                </p>

                <div className={styles.itemFooter} style={{ marginTop: '1rem' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: '100%' }}
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={16} style={{ marginRight: '0.5rem' }} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default WishlistDrawer;
