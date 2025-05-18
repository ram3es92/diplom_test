
import { useState } from 'react';
import type { CartItem } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CartDrawer({ open, onClose, items }: CartDrawerProps) {
  const { removeItem, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const handlePlaceOrder = async () => {
    if (!token) {
      alert('Пожалуйста, авторизуйтесь, чтобы оформить заказ');
      return;
    }
    if (items.length === 0) {
      alert('Корзина пуста');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: items.map(({ id, qty }) => ({ productId: id, qty })) }),
      });
      if (!response.ok) throw new Error('Ошибка при оформлении заказа');
      const order = await response.json();
      clearCart();
      onClose();
      alert(`Заказ №${order._id} оформлен успешно!`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Не удалось оформить заказ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-30 transform transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <button
          onClick={onClose}
          className="self-end text-2xl text-gray-500 hover:text-gray-700"
          aria-label="Закрыть корзину"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Корзина</h2>
        {items.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="mb-4 text-sm text-red-600 hover:underline"
          >
            Очистить корзину
          </button>
        )}
        <div className="flex-1 overflow-y-auto space-y-2">
          {items.length === 0 ? (
            <p className="text-gray-500">Корзина пуста</p>
          ) : (
            items.map((it: CartItem) => (
              <div
                key={it.id}
                className="flex justify-between border-b pb-1 text-sm"
              >
                <span>
                  {it.name} × {it.qty}
                </span>
                <div className="flex items-center space-x-2">
                  <span>{it.price * it.qty} ₽</span>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Удалить товар"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 border-t pt-2 text-right font-semibold">
          Итого: {total} ₽
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading || items.length === 0}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
}

