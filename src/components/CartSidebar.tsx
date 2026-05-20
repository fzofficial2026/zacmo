"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              zIndex: 999,
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              maxWidth: "480px",
              height: "100vh",
              backgroundColor: "var(--black-bg)",
              borderLeft: "1px solid var(--border)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              padding: "40px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.02em" }}>Your Bag</h2>
              <button onClick={closeCart} style={{ background: "none", color: "var(--white-text)", padding: "8px" }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "32px" }}>
              {cart.length === 0 ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-text)" }}>
                  Your bag is currently empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "24px" }}>
                    <div style={{ width: "100px", height: "120px", backgroundColor: "var(--black-card)" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 500 }}>{item.name}</h3>
                        <p style={{ fontWeight: 500 }}>${item.price.toFixed(2)}</p>
                      </div>
                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", padding: "4px" }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: "none", color: "var(--white-text)", padding: "4px" }}>
                            <Minus size={14} />
                          </button>
                          <span style={{ margin: "0 16px", fontSize: "0.9rem" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: "none", color: "var(--white-text)", padding: "4px" }}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", color: "var(--gray-text)", textDecoration: "underline", fontSize: "0.85rem" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "1.2rem", fontWeight: 500 }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={closeCart} className="btn-accent" style={{ display: "block", textAlign: "center", width: "100%" }}>
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
