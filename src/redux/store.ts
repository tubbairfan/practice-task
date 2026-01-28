import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice';
import orderSlice from './slices/orderslice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    order: orderSlice,
  },
});


const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    const cartState = JSON.parse(savedCart);
    store.dispatch({ type: 'cart/loadCart', payload: cartState });
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e);
  }
}

// Load orders from localStorage
const savedOrders = localStorage.getItem('orders');
if (savedOrders) {
  try {
    const ordersState = JSON.parse(savedOrders);
    store.dispatch({ type: 'order/setOrders', payload: ordersState });
  } catch (e) {
    console.error('Failed to load orders from localStorage:', e);
  }
}

// Save cart and orders to localStorage on changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('orders', JSON.stringify(state.order.orders));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;