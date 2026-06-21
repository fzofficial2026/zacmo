import Link from 'next/link';
import FeaturedProducts from '@/components/FeaturedProducts';
import ReelsSection from '@/components/ReelsSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className="heading-hero">
            Electric <span className={styles.redText}>Style</span>
          </h1>
          <p className="text-body">
            Experience the future of streetwear. Premium quality, futuristic design, zero compromises.
          </p>
          <div className={styles.actions}>
            <Link href="/collections/all" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/custom-designer" className="btn-secondary">
              Custom Designer
            </Link>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      <ReelsSection />
    </div>
  );
}
