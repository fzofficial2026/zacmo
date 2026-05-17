"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "150px", textAlign: "center", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Your Cart is Empty</h1>
        <p style={{ color: "var(--gray-text)", marginBottom: "40px" }}>
          Looks like you haven't added anything yet.
        </p>
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "40px" }}>Shopping Cart</h1>
      
      <div className="cart-layout">
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{item.name}</h3>
                  <p style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <p style={{ color: "var(--gray-text)", marginTop: "4px" }}>${item.price.toFixed(2)} each</p>
                
                <div className="cart-item-actions">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="glass-panel order-summary">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "24px" }}>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link href="/checkout" className="btn-accent" style={{ display: "block", textAlign: "center", width: "100%", marginTop: "32px", padding: "16px" }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
