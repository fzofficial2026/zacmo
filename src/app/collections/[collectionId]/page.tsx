import React from 'react';
import { mockProducts } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './page.module.css';

export default function CollectionPage({ params }: { params: { collectionId: string } }) {
  // In a real app, fetch products based on collectionId
  const collectionName = params.collectionId === 'all' 
    ? 'All Products' 
    : params.collectionId.charAt(0).toUpperCase() + params.collectionId.slice(1);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="heading-section">{collectionName}</h1>
        <p className="text-body">Discover the latest in premium streetwear.</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input type="text" placeholder="Search products..." className={styles.searchInput} />
        </div>
        
        <button className={styles.filterBtn}>
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      <div className={styles.grid}>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {mockProducts.map(product => (
          <ProductCard key={product.id + '_dup'} product={{...product, id: product.id + '_dup'}} />
        ))}
      </div>
    </div>
  );
}
