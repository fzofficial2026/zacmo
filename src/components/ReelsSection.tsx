"use client";
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Heart } from 'lucide-react';
import { mockReels } from '@/lib/mockData';
import styles from './ReelsSection.module.css';

const ReelsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className="heading-section">ZACMO <span style={{color: 'var(--color-electric-red)'}}>Reels</span></h2>
        <Link href="/reels" className={styles.viewAll}>View All</Link>
      </div>
      
      <div className={styles.reelsContainer} ref={containerRef}>
        {mockReels.map((reel) => (
          <div key={reel.id} className={styles.reelCard}>
            <video 
              src={reel.videoUrl} 
              className={styles.video}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className={styles.overlay}>
              <div className={styles.playIcon}><Play fill="white" size={32} /></div>
              <div className={styles.reelInfo}>
                <p className={styles.title}>{reel.title}</p>
                <div className={styles.actions}>
                  <button className={styles.actionBtn}>
                    <Heart size={20} />
                    <span>{reel.likes}</span>
                  </button>
                  <Link href={`/product/${reel.productLink}`} className={styles.shopBtn}>
                    Shop Look
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;
