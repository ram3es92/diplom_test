import { createContext, useContext, useReducer, type ReactNode } from 'react';

// Тип элемента корзины
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

// Состояние
type CartState = {
  items: CartItem[];
};

// Действия
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

// Редьюсер
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + action.payload.qty }
              : i
          )
        };
      }
      return { items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(i => i.id !== action.payload.id)
      };

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

// Контекст
type CartContextType = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Провайдер
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) =>
    dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Хук для доступа
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
