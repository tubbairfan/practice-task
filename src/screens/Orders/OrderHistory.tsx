import { useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { Link } from "@tanstack/react-router";
import { toast } from 'react-toastify';
export function OrderHistory() {
  const { orders, getOrderByNumber, removeOrder, formatOrderDate } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState("");


  const currentOrder = selectedOrder ? getOrderByNumber(selectedOrder) : null;
  
  if (orders.length === 0) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-3xl font-bold mb-4">Order History</h1>
        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
        <Link to="/" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <Link to="/cart" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-6">📋 Order History</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                onClick={() => setSelectedOrder(order.orderNumber)}
                className={`border-2 p-4 rounded-lg cursor-pointer transition ${selectedOrder === order.orderNumber
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:shadow-md"
                  }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500">
                      {formatOrderDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{order.items.length} items</p>
                    <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order.orderNumber);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="lg:col-span-1">
          {currentOrder ? (
            <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold break-all">{currentOrder.orderNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">{formatOrderDate(currentOrder.createdAt)}</p>
                </div>
              </div>


              <div className="mb-6 border-t pt-4">
                <h3 className="font-bold mb-3">Items ({currentOrder.items.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {currentOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-2 text-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-12 w-12 object-contain rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold line-clamp-1">{item.title}</p>
                        <p className="text-gray-600">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${currentOrder.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${currentOrder.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  toast.warn(
                    ({ closeToast }) => (
                      <div>
                        <p>Are you sure?</p>
                        <div style={{ marginTop: "10px" }}>
                          <button
                            onClick={() => {
                              removeOrder(currentOrder.orderNumber);
                              setSelectedOrder("");
                              closeToast();
                            }}
                            style={{ marginRight: "10px" }}
                          >
                            Yes
                          </button>
                          <button onClick={closeToast}>No</button>
                        </div>
                      </div>
                    ),
                    { autoClose: false, closeOnClick: false  }
                  );
                }}
                className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete Order
              </button>

            
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg text-center">
              <p className="text-gray-500">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
