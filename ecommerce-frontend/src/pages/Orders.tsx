import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Типы
type ProductInfo = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

type OrderItem = {
  productId: ProductInfo | string;
  qty: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
};

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [token]);

  if (loading) return <p className="p-6">Загрузка заказов…</p>;
  if (error)   return <p className="p-6 text-red-500">Ошибка: {error}</p>;
  if (!orders.length) return <p className="p-6">У вас пока нет заказов.</p>;

  const statusRu: Record<string, string> = {
    pending:    'в обработке',
    paid:       'оплачен',
    shipped:    'отправлен',
    delivered:  'доставлен',
    cancelled:  'отменён',
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Мои заказы</h1>
      {orders.map(order => (
        <div key={order._id} className="border rounded p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Заказ #{order._id.slice(-6)}</span>
            <span className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
          <ul className="mb-2 space-y-1">
            {order.items.map((it, idx) => {
              
              const desc =
                typeof it.productId === 'object'
                  ? `${it.productId.name} × ${it.qty} — ${it.productId.price * it.qty} ₽`
                  : `Товар ID: ${it.productId} × ${it.qty}`;

              return (
                <li key={idx} className="text-sm">
                  {desc}
                </li>
              );
            })}
          </ul>
          <div className="text-sm">
          <span className="font-semibold">Статус:</span>{' '}
          {statusRu[order.status] ?? order.status}
          </div>
        </div>
      ))}
    </div>
  );
}

