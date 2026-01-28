import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartslice";
import { useOrder } from "../../hooks/useOrder";
import { Link } from "@tanstack/react-router";
import { CartItems, OrderSummary, CheckoutModal } from "./components";
import { OrderConfirmation } from "../Orders/components";

export function CartDisplay() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { createNewOrder } = useOrder();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("");

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = parseFloat((cartTotal * 0.1).toFixed(2));
  const shipping = cartTotal > 100 ? 0 : 10;
  const finalTotal = cartTotal + tax + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const handlePlaceOrder = () => {

    const order = createNewOrder(cartItems, cartTotal, tax, shipping);
    setCurrentOrder(order.orderNumber);
    setShowCheckoutModal(false);
    setShowOrderConfirmation(true);
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-gray-600 text-lg">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartItems cartItems={cartItems} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            cartTotal={cartTotal}
            tax={tax}
            shipping={shipping}
            finalTotal={finalTotal}
            onCheckout={() => setShowCheckoutModal(true)}
          />
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckoutModal}
        cartItems={cartItems}
        cartTotal={cartTotal}
        tax={tax}
        shipping={shipping}
        finalTotal={finalTotal}
        onClose={() => setShowCheckoutModal(false)}
        onPlaceOrder={handlePlaceOrder}
      />
      <OrderConfirmation
        isOpen={showOrderConfirmation}
        orderNumber={currentOrder}
        finalTotal={finalTotal}
      />
    </div>
  );
}