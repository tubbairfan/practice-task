import { useSelector, useDispatch } from "react-redux";
import {
  createOrder,
  setCurrentOrder,
  updateOrderStatus,
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

  // Create new order
  const createNewOrder = (items: OrderItem[], subtotal: number, tax: number, shipping: number) => {
    const total = subtotal + tax + shipping;
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newOrder: Order = {
      orderNumber,
      items,
      subtotal,
      tax,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    dispatch(createOrder(newOrder));
    return newOrder;
  };

  // Get all orders
  const getAllOrders = () => {
    return orders;
  };

  // Get order by number
  const getOrderByNumber = (orderNumber: string) => {
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
      dispatch(setCurrentOrder(order));
    }
    return order;
  };

  // Update order status
  const updateStatus = (orderNumber: string, status: Order['status']) => {
    dispatch(updateOrderStatus({ orderNumber, status }));
  };

  // Delete order
  const removeOrder = (orderNumber: string) => {
    dispatch(deleteOrder(orderNumber));
  };

  // Clear all orders
  const clearOrders = () => {
    dispatch(clearAllOrders());
  };

  // Clear current order
  const clearCurrent = () => {
    dispatch(clearCurrentOrder());
  };

  // Get order statistics
  const getOrderStats = () => {
    return {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      shippedOrders: orders.filter(o => o.status === 'shipped').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    };
  };

  // Format order date
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
    // State
    orders,
    currentOrder,

    // Actions
    createNewOrder,
    getAllOrders,
    getOrderByNumber,
    updateStatus,
    removeOrder,
    clearOrders,
    clearCurrent,

    // Utilities
    getOrderStats,
    formatOrderDate,
  };
}
