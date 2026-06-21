"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { ShoppingBag, Type, Palette, Save } from 'lucide-react';
import styles from './page.module.css';

const CustomDesigner = () => {
  const { addToCart, toggleCart } = useAppStore();
  const [customText, setCustomText] = useState('ZACMO');
  const [textColor, setTextColor] = useState('#ff003c'); // Electric Red
  const [garmentColor, setGarmentColor] = useState('#050505'); // Black
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redraw canvas whenever text or colors change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw base garment placeholder (a stylized t-shirt shape)
    ctx.fillStyle = garmentColor;
    ctx.beginPath();
    // Simplified t-shirt shape
    ctx.moveTo(100, 50);
    ctx.lineTo(150, 100);
    ctx.lineTo(130, 120);
    ctx.lineTo(110, 100);
    ctx.lineTo(110, 350);
    ctx.lineTo(290, 350);
    ctx.lineTo(290, 100);
    ctx.lineTo(270, 120);
    ctx.lineTo(250, 100);
    ctx.lineTo(300, 50);
    ctx.lineTo(250, 20);
    ctx.lineTo(230, 40);
    ctx.quadraticCurveTo(200, 70, 170, 40);
    ctx.lineTo(150, 20);
    ctx.closePath();
    ctx.fill();

    // Add lighting/shading effect to garment
    const gradient = ctx.createLinearGradient(100, 0, 300, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw custom text
    ctx.font = '900 40px "Outfit", sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add glow effect if electric red
    if (textColor === '#ff003c') {
      ctx.shadowColor = 'rgba(255, 0, 60, 0.8)';
      ctx.shadowBlur = 15;
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.fillText(customText || 'Your Text', 200, 150);
    
    // Reset shadow
    ctx.shadowBlur = 0;

  }, [customText, textColor, garmentColor]);

  const handleAddToCart = () => {
    // Generate a data URL of the customized image
    const previewImage = canvasRef.current?.toDataURL('image/png') || '';

    addToCart({
      id: `custom_${Date.now()}`,
      name: 'Custom ZACMO Tee',
      price: 85.00,
      image: previewImage,
      customization: {
        text: customText,
        textColor,
        garmentColor
      }
    }, 1);
    toggleCart();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="heading-section">Custom <span style={{color: 'var(--color-electric-red)'}}>Studio</span></h1>
        <p className="text-body">Design your own premium ZACMO piece.</p>
      </header>

      <div className={styles.studioLayout}>
        <div className={styles.canvasContainer}>
          <div className={styles.canvasWrapper}>
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={400} 
              className={styles.canvas}
            />
          </div>
          <p className={styles.canvasNote}>Live Preview</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <h3 className={styles.controlTitle}><Palette size={18}/> Garment Color</h3>
            <div className={styles.colorOptions}>
              <button 
                className={`${styles.colorBtn} ${garmentColor === '#050505' ? styles.active : ''}`}
                style={{ background: '#050505' }}
                onClick={() => setGarmentColor('#050505')}
                aria-label="Black"
              />
              <button 
                className={`${styles.colorBtn} ${garmentColor === '#ffffff' ? styles.active : ''}`}
                style={{ background: '#ffffff', border: '1px solid #ccc' }}
                onClick={() => setGarmentColor('#ffffff')}
                aria-label="White"
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <h3 className={styles.controlTitle}><Type size={18}/> Custom Text</h3>
            <input 
              type="text" 
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className={styles.textInput}
              maxLength={15}
              placeholder="Enter text..."
            />
          </div>

          <div className={styles.controlGroup}>
            <h3 className={styles.controlTitle}><Palette size={18}/> Text Color</h3>
            <div className={styles.colorOptions}>
              <button 
                className={`${styles.colorBtn} ${textColor === '#ff003c' ? styles.active : ''}`}
                style={{ background: '#ff003c' }}
                onClick={() => setTextColor('#ff003c')}
                aria-label="Electric Red"
              />
              <button 
                className={`${styles.colorBtn} ${textColor === '#ffffff' ? styles.active : ''}`}
                style={{ background: '#ffffff', border: '1px solid #ccc' }}
                onClick={() => setTextColor('#ffffff')}
                aria-label="White"
              />
              <button 
                className={`${styles.colorBtn} ${textColor === '#050505' ? styles.active : ''}`}
                style={{ background: '#050505', border: '1px solid #ccc' }}
                onClick={() => setTextColor('#050505')}
                aria-label="Black"
              />
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Base Garment</span>
              <span>$65.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Custom Print</span>
              <span>$20.00</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>$85.00</span>
            </div>
          </div>

          <button className={`btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
            <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add Design to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDesigner;
