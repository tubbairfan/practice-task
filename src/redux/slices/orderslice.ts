import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
export interface Order {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;

  total: number;
  createdAt: string;
}
interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.orderNumber !== action.payload);
      if (state.currentOrder?.orderNumber === action.payload) {
        state.currentOrder = null;
      }
    },
    
    clearAllOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  createOrder,
  setOrders,
  setCurrentOrder,
  deleteOrder,
  clearAllOrders,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
