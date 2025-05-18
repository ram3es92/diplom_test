import { useParams } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  useCart()
  const product = products.find(p => p.id === id)
  if (!product) return <p className="p-6">Товар не найден</p>
  function dispatch(_arg0: { type: string; payload: { id: string } }): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{product.price} ₽</p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded" onClick={() => dispatch({ type: 'add', payload: { id: product.id } })}>
        Добавить в корзину
      </button>
    </div>
  )
}