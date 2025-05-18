// src/layout/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  onCartClick: () => void;
}

export default function Layout({ children, onCartClick }: LayoutProps) {
  const { userEmail, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Онлайн магазин "Гастроном"</Link>
        <nav className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">Войти</Link>
              <Link to="/register" className="hover:underline">Регистрация</Link>
              
            </>
          ) : (
            <>
              <span>Привет, {userEmail}</span>
              <Link to="/orders" className="hover:underline">Мои заказы</Link>
              <button onClick={logout} className="hover:underline">Выйти</button>
            </>
          )}
          <button
            onClick={onCartClick}
            className="relative text-2xl hover:opacity-80 focus:outline-none"
            aria-label="Открыть корзину"
          >
            🛒
          </button>
        </nav>
      </header>
      <main className="flex-1 relative">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-sm text-center py-3">
        © 2025 Онлайн магазин "Гастроном"
      </footer>
    </div>
  );
}