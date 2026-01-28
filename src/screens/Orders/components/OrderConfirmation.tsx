import { Link } from "@tanstack/react-router";

interface OrderConfirmationProps {
  isOpen: boolean;
  orderNumber: string;
  finalTotal: number;
}
export function OrderConfirmation({ isOpen, orderNumber, finalTotal }: OrderConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center animate-bounce">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2 text-green-600">Order Placed!</h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase</p>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Order Number:</p>
          <p className="text-xl font-bold text-green-600 break-all">{orderNumber}</p>
        </div>

        <div className="text-2xl font-bold text-gray-800 mb-6">
          Total: ${finalTotal.toFixed(2)}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          ✅ Cart cleared successfully
        </p>
        <p className="text-sm text-gray-500">
          Redirecting in 5 seconds...
        </p>

        <Link
          to="/"
          className="block mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
