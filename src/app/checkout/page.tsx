"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate secure payment gateway API call
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, amount: cartTotal })
      });
      
      const data = await response.json();
      
      if (data.success) {
        clearCart();
        alert("Payment Successful! Order tracking details have been sent to your email.");
        router.push("/");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;
  
  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "200px", textAlign: "center", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "24px", fontWeight: 400 }}>Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "160px", paddingBottom: "100px" }}>
      <div className="cart-layout">
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "40px" }}>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: "1rem", marginBottom: "20px", color: "var(--gray-text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</h2>
            <input type="email" placeholder="Email Address" className="input-field" required />
            
            <h2 style={{ fontSize: "1rem", marginBottom: "20px", marginTop: "40px", color: "var(--gray-text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Shipping</h2>
            <div style={{ display: "flex", gap: "16px" }}>
              <input type="text" placeholder="First Name" className="input-field" required />
              <input type="text" placeholder="Last Name" className="input-field" required />
            </div>
            <input type="text" placeholder="Address" className="input-field" required />
            <div style={{ display: "flex", gap: "16px" }}>
              <input type="text" placeholder="City" className="input-field" required />
              <input type="text" placeholder="Postal Code" className="input-field" required />
            </div>
            
            <h2 style={{ fontSize: "1rem", marginBottom: "20px", marginTop: "40px", color: "var(--gray-text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment</h2>
            <div style={{ border: "1px solid var(--border)", padding: "24px", borderRadius: "4px", marginBottom: "40px", backgroundColor: "var(--black-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <p style={{ color: "var(--gray-text)", fontSize: "0.85rem", letterSpacing: "0.02em" }}>
                  Secure 128-bit SSL Encrypted Transaction
                </p>
              </div>
              <input type="text" placeholder="Card Number" className="input-field" required />
              <div style={{ display: "flex", gap: "16px" }}>
                <input type="text" placeholder="MM/YY" className="input-field" required />
                <input type="text" placeholder="CVC" className="input-field" required />
              </div>
            </div>
            
            <button type="submit" className="btn-accent" style={{ width: "100%" }} disabled={loading}>
              {loading ? "PROCESSING..." : `PAY $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
        
        <div>
          <div className="order-summary">
            <h2 style={{ fontSize: "1rem", marginBottom: "32px", color: "var(--gray-text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Order Details</h2>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "20px", marginBottom: "24px" }}>
                <img src={item.image} alt={item.name} style={{ width: "70px", height: "90px", objectFit: "cover", borderRadius: "2px" }} />
                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 500 }}>{item.name}</h4>
                  <p style={{ color: "var(--gray-text)", fontSize: "0.85rem", marginTop: "4px" }}>Qty: {item.quantity}</p>
                  <p style={{ marginTop: "auto", fontSize: "0.95rem" }}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
