import { Link } from "@tanstack/react-router";
interface OrderSummaryProps {
  cartTotal: number;
  tax: number;
  finalTotal: number;
  onCheckout: () => void;
}

export function OrderSummary({
  cartTotal,
  tax,
  finalTotal,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg sticky top-20">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">${cartTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%):</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-lg text-green-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition text-lg"
      >
        Proceed to Checkout
      </button>

      <Link
        to="/"
        className="block text-center mt-3 text-blue-500 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
