
interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: any[];
  cartTotal: number;
  tax: number;
  shipping: number;
  finalTotal: number;
  onClose: () => void;
  onPlaceOrder: () => void;
}

export function CheckoutModal({
  isOpen,
  cartItems,
  cartTotal,
  tax,
  shipping,
  finalTotal,
  onClose,
  onPlaceOrder,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">📋 Order Bill</h2>

        {/* Bill Items */}
        <div className="space-y-3 mb-6 border-b pb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="truncate pr-2">{item.title}</span>
              <span className="font-semibold">
                {item.quantity} × ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-6 border-b pb-6">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Final Total:</span>
            <span className="text-2xl font-bold text-green-600">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

      
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onPlaceOrder}
            className="flex-1 px-4 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
          >
            Place Order ✓
          </button>
        </div>
      </div>
    </div>
  );
}
