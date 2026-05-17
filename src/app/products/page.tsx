import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
      <h1 style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "40px", letterSpacing: "0.05em" }}>ALL GEAR</h1>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.id}`} className="product-img-wrapper">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-img"
              />
            </Link>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
