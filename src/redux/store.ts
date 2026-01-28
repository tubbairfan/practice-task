import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// Load cart from localStorage on startup
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    const cartState = JSON.parse(savedCart);
    store.dispatch({ type: 'cart/loadCart', payload: cartState });
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e);
  }
}

// Save cart to localStorage whenever it changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;