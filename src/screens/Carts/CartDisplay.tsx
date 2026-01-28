import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartslice";
import { Link } from "@tanstack/react-router";

export function CartDisplay() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
    <div className="p-5 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-gray-300 p-4 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  )
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <div className="text-right">
          <p className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}