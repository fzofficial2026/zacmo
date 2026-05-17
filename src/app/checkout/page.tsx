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
      <div className="container" style={{ paddingTop: "150px", textAlign: "center", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="cart-layout">
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "32px" }}>Checkout</h1>
          <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: "32px" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Contact Information</h2>
            <input type="email" placeholder="Email" className="input-field" required />
            
            <h2 style={{ fontSize: "1.2rem", marginBottom: "16px", marginTop: "24px" }}>Shipping Address</h2>
            <div style={{ display: "flex", gap: "16px" }}>
              <input type="text" placeholder="First Name" className="input-field" required />
              <input type="text" placeholder="Last Name" className="input-field" required />
            </div>
            <input type="text" placeholder="Address" className="input-field" required />
            <div style={{ display: "flex", gap: "16px" }}>
              <input type="text" placeholder="City" className="input-field" required />
              <input type="text" placeholder="Postal Code" className="input-field" required />
            </div>
            
            <h2 style={{ fontSize: "1.2rem", marginBottom: "16px", marginTop: "24px" }}>Secure Payment</h2>
            <div style={{ border: "1px solid var(--border)", padding: "16px", borderRadius: "0", marginBottom: "24px", backgroundColor: "#0a0a0a" }}>
              <p style={{ color: "var(--gray-text)", fontSize: "0.9rem", marginBottom: "12px" }}>
                🔒 This is a secure 128-bit SSL encrypted payment.
              </p>
              <input type="text" placeholder="Card Number" className="input-field" required />
              <div style={{ display: "flex", gap: "16px" }}>
                <input type="text" placeholder="MM/YY" className="input-field" required />
                <input type="text" placeholder="CVC" className="input-field" required />
              </div>
            </div>
            
            <button type="submit" className="btn-accent" style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }} disabled={loading}>
              {loading ? "Processing..." : `PAY $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
        
        <div>
          <div className="order-summary glass-panel">
            <h2 style={{ fontSize: "1.2rem", marginBottom: "24px" }}>Order Details</h2>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <img src={item.image} alt={item.name} style={{ width: "60px", height: "70px", objectFit: "cover", borderRadius: "0" }} />
                <div>
                  <h4 style={{ fontSize: "0.9rem" }}>{item.name}</h4>
                  <p style={{ color: "var(--gray-text)", fontSize: "0.9rem" }}>Qty: {item.quantity}</p>
                  <p style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "16px", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
