"use client";
import React, { useState } from 'react';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import styles from './page.module.css';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  if (!isLoggedIn) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
          <h1 className="heading-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h1>
          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="you@example.com" required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" required className={styles.input} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Sign In
            </button>
            <p className={styles.authSwitch}>
              Don't have an account? <button type="button" className={styles.linkBtn}>Create one</button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="heading-section">My Account</h1>
        <button className={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
          <LogOut size={18} /> Sign Out
        </button>
      </header>

      <div className={styles.dashboard}>
        <nav className={styles.sidebar}>
          <button 
            className={`${styles.navBtn} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} /> Profile
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={20} /> Orders
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'addresses' ? styles.active : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={20} /> Addresses
          </button>
        </nav>

        <main className={styles.mainContent}>
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <h2>Personal Information</h2>
              <p>Manage your details and preferences here.</p>
              <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Name</span>
                  <span className={styles.infoValue}>Alex Mercer</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>alex@example.com</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className={styles.tabContent}>
              <h2>Order History</h2>
              <div className={styles.orderList}>
                <div className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderNumber}>#ZAC-10492</span>
                    <span className={styles.orderStatus}>Delivered</span>
                  </div>
                  <div className={styles.orderDetails}>
                    <p>Date: May 12, 2026</p>
                    <p>Total: $120.00</p>
                  </div>
                </div>
                <div className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderNumber}>#ZAC-09841</span>
                    <span className={styles.orderStatus}>Processing</span>
                  </div>
                  <div className={styles.orderDetails}>
                    <p>Date: June 18, 2026</p>
                    <p>Total: $85.00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className={styles.tabContent}>
              <h2>Saved Addresses</h2>
              <div className={styles.addressCard}>
                <h3>Default Shipping</h3>
                <p>123 Neon Avenue<br/>Apt 4B<br/>Cyber City, CA 90210<br/>United States</p>
                <button className="btn-secondary" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Edit</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
