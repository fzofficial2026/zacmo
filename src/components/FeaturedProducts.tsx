"use client";
import React from 'react';
import Link from 'next/link';
import { mockProducts } from '@/lib/mockData';
import ProductCard from './ProductCard';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const featured = mockProducts.filter(p => p.featured);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className="heading-section">Trending <span style={{color: 'var(--color-electric-red)'}}>Now</span></h2>
        <Link href="/collections/all" className={styles.viewAll}>Shop All</Link>
      </div>
      
      <div className={styles.grid}>
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
