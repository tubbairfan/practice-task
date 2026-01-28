import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { removeFromCart, updateQuantity } from "../../../redux/slices/cartslice";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemsProps {
  cartItems: CartItem[];
}

export function CartItems({ cartItems }: CartItemsProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border border-gray-300 p-4 rounded-lg hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-24 w-24 object-contain"
          />

          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2">{item.title}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
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
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              title="Decrease quantity"
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
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              title="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="text-right min-w-28">
            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
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
  );
}
