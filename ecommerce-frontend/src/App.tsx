// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Orders from './pages/Orders';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import CartDrawer from './components/CartDrawer';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import { useCart } from './context/CartContext';

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const { state: { items } } = useCart();

  return (
    <>
      <Layout onCartClick={() => setCartOpen(true)}>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          {/* Мои заказы */}
          <Route
            path="/orders"
            element={
             <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          {/* Main */}
          <Route path="/"             element={<Catalog />} />
          <Route path="/catalog"      element={<Catalog />} />
          <Route path="/product/:id"  element={<Product />} />
        </Routes>
      </Layout>

      <CartDrawer
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
      />
    </>
  );
}
