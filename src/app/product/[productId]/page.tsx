"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';
import ProductViewer3D from '@/components/ProductViewer3D';
import { Heart, ShoppingBag, Box, Star } from 'lucide-react';
import styles from './page.module.css';

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = mockProducts.find(p => p.id === params.productId);
  
  if (!product) {
    notFound();
  }

  const { addToCart, wishlist, addToWishlist, removeFromWishlist, toggleCart } = useAppStore();
  
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
    }, 1);
    toggleCart(); // Open cart drawer to show feedback
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.mediaSection}>
          <div className={styles.viewControls}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'image' ? styles.active : ''}`}
              onClick={() => setViewMode('image')}
            >
              Gallery
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === '3d' ? styles.active : ''}`}
              onClick={() => setViewMode('3d')}
            >
              <Box size={16} /> 3D Viewer
            </button>
          </div>
          
          <div className={styles.mediaContainer}>
            {viewMode === 'image' ? (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority
              />
            ) : (
              <ProductViewer3D color={selectedColor} />
            )}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1 className="heading-section" style={{ marginBottom: '0.5rem' }}>{product.name}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--color-electric-red)" color="var(--color-electric-red)" />)}
            </div>
            <span className={styles.reviewsCount}>(128 Reviews)</span>
          </div>

          <p className="text-body" style={{ margin: '2rem 0' }}>{product.description}</p>

          {product.colors && (
            <div className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Color: <span>{selectedColor}</span></h3>
              <div className={styles.optionsList}>
                {product.colors.map(color => (
                  <button 
                    key={color}
                    className={`${styles.colorBtn} ${selectedColor === color ? styles.selected : ''}`}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : '#050505' }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Size: <span>{selectedSize}</span></h3>
              <div className={styles.optionsList}>
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button className={`btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
              <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
            </button>
            <button 
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
              onClick={handleToggleWishlist}
              aria-label="Wishlist"
            >
              <Heart size={24} fill={isWishlisted ? "var(--color-electric-red)" : "none"} />
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <h4>Premium Materials</h4>
              <p>Engineered for maximum durability and comfort.</p>
            </div>
            <div className={styles.featureItem}>
              <h4>Fast Shipping</h4>
              <p>Orders process within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
