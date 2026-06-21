"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import Drawer from './Drawer';
import { Trash2, Plus, Minus } from 'lucide-react';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useAppStore();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const Footer = (
    <div className={styles.footerContent}>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span className={styles.price}>${subtotal.toFixed(2)}</span>
      </div>
      <p className={styles.taxNote}>Taxes and shipping calculated at checkout.</p>
      <Link href="/checkout" className="btn-primary" style={{ width: '100%' }} onClick={toggleCart}>
        Proceed to Checkout
      </Link>
    </div>
  );

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={toggleCart}
      title={`Your Cart (${cart.length})`}
      footer={cart.length > 0 ? Footer : undefined}
      position="right"
    >
      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Your cart is currently empty.</p>
          <button className="btn-secondary" onClick={toggleCart} style={{ marginTop: '2rem' }}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.cartItemId} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <Link href={`/product/${item.id}`} onClick={toggleCart} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <button onClick={() => removeFromCart(item.cartItemId)} className={styles.removeBtn} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                {item.color && <p className={styles.itemVariant}>Color: {item.color}</p>}
                {item.size && <p className={styles.itemVariant}>Size: {item.size}</p>}
                {item.customization && (
                  <p className={styles.itemVariant} style={{ color: 'var(--color-electric-red)' }}>
                    Custom Design Applied
                  </p>
                )}

                <div className={styles.itemFooter}>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
