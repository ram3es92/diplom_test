import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

// Определяем тип товара
interface Product {
  _id: string;
  id: string;        // теперь есть оба
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: any[]) => {
        // каждое p._id копируем в p.id, чтобы ProductCard получал корректный id
        const withId = data.map(p => ({ ...p, id: p._id }));
        setProducts(withId);
      });
  }, []);

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}