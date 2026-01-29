import { useSelector, useDispatch } from "react-redux";
import {
  createOrder,
  setCurrentOrder,
  deleteOrder,
  clearAllOrders,
  clearCurrentOrder,
  type Order,
  type OrderItem,
} from "../redux/slices/orderslice";
import type { RootState, AppDispatch } from "../redux/store";

export function useOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.order.orders);
  const currentOrder = useSelector((state: RootState) => state.order.currentOrder);

  const createNewOrder = (items: OrderItem[], subtotal: number, tax: number) => {
    const total = subtotal + tax ;
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newOrder: Order = {
      orderNumber,
      items,
      subtotal,
      tax,
      total,
      createdAt: new Date().toISOString(),
    };

    dispatch(createOrder(newOrder));
    return newOrder;
  };
  const getAllOrders = () => {
    return orders;
  };
  const getOrderByNumber = (orderNumber: string) => {
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
      dispatch(setCurrentOrder(order));
    }
    return order;
  };

  const removeOrder = (orderNumber: string) => {
    dispatch(deleteOrder(orderNumber));
  };

  const clearOrders = () => {
    dispatch(clearAllOrders());
  };


  const clearCurrent = () => {
    dispatch(clearCurrentOrder());
  };

  const formatOrderDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return {
    orders,
    currentOrder,
    createNewOrder,
    getAllOrders,
    getOrderByNumber,
    removeOrder,
    clearOrders,
    clearCurrent,
    formatOrderDate,
  };
}
