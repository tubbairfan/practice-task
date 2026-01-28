import { useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { Link } from "@tanstack/react-router";

export function OrderHistory() {
  const { orders, getOrderByNumber, updateStatus, removeOrder, formatOrderDate, getOrderStats } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "shipped" | "delivered">("all");

  const stats = getOrderStats();
  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);
  const currentOrder = selectedOrder ? getOrderByNumber(selectedOrder) : null;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳ Pending";
      case "completed":
        return "✓ Completed";
      case "shipped":
        return "📦 Shipped";
      case "delivered":
        return "🎉 Delivered";
      default:
        return status;
    }
  };

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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <p className="text-gray-600 text-sm">Shipped</p>
          <p className="text-3xl font-bold text-purple-600">{stats.shippedOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm">Delivered</p>
          <p className="text-3xl font-bold text-green-600">{stats.deliveredOrders}</p>
        </div>
        {/* <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
          <p className="text-gray-600 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-pink-600">${stats.totalSpent.toFixed(2)}</p>
        </div> */}
      </div>

     
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "completed", "shipped", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
   
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.orderNumber}
                onClick={() => setSelectedOrder(order.orderNumber)}
                className={`border-2 p-4 rounded-lg cursor-pointer transition ${
                  selectedOrder === order.orderNumber
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
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                    {getStatusBadge(order.status)}
                  </span>
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

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="flex gap-2 mt-1">
                    {["pending", "completed", "shipped", "delivered"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(currentOrder.orderNumber, s as any)}
                        className={`px-2 py-1 text-xs rounded font-semibold transition ${
                          currentOrder.status === s
                            ? `${getStatusColor(s)} cursor-default`
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {getStatusBadge(s).split(" ")[1]}
                      </button>
                    ))}
                  </div>
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
                  <span>Shipping:</span>
                  <span>${currentOrder.shipping.toFixed(2)}</span>
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
                  if (window.confirm("Are you sure you want to delete this order?")) {
                    removeOrder(currentOrder.orderNumber);
                    setSelectedOrder("");
                  }
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
