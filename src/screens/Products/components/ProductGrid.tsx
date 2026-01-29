import { useState } from "react";
import type { Product } from "../Productsdata";
import { toast } from "react-toastify";
interface ProductGridProps {
  products: Product[] | undefined;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const getQuantity = (productId: number) => quantities[productId] || 1;

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    onAddToCart(product, quantity);
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities({
      ...quantities,
      [productId]: Math.max(1, newQuantity),
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products?.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 p-3 rounded-lg hover:shadow-md transition"
        >
          <img
            src={product.image}
            className="h-30 w-full object-contain mb-3"
            alt={product.title}
          />

          <h4 className="text-sm font-medium line-clamp-2 mb-1">
            {product.title}
          </h4>

          <p className="font-semibold text-gray-800">${product.price}</p>

          <small className="text-gray-500">⭐ {product.rating.rate}</small>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() =>
                handleQuantityChange(product.id, getQuantity(product.id) - 1)
              }
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
              title="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold text-sm">
              {getQuantity(product.id)}
            </span>
            <button
              onClick={() =>
                handleQuantityChange(product.id, getQuantity(product.id) + 1)
              }
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
              title="Increase quantity"
            >
              +
            </button>
            <button
              onClick={() => {
                handleAddToCart(product);
                toast.dismiss();
                toast.success(` Added to cart!`);
              }}
              className="flex-1 bg-blue-500 text-white py-1 text-sm rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
