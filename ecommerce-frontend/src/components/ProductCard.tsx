// src/components/ProductCard.tsx

import { useCart, type CartItem } from '../context/CartContext';

interface Product {
  _id: string;       // именно так приходит из MongoDB
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    const item: CartItem = {
      id: product._id,      // <- берём _id, а не id
      name: product.name,
      price: product.price,
      qty: 1
    };
    addItem(item);
  };

  return (
    <article className="border rounded-xl p-4 shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.price} ₽</p>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
        onClick={handleAdd}
      >
        Добавить в корзину
      </button>
    </article>
  );
}

