import type { Product } from "../Productsdata";

interface ProductGridProps {
  products: Product[] | undefined;
  onAddToCart: (product: Product) => void;
  onView: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductGrid({
  products,
  onAddToCart,
  onView,
  onEdit,
  onDelete,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products?.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 p-3 rounded-lg hover:shadow-md transition"
        >
          <img
            src={product.image}
            className="h-30 w-full object-contain mb-3 cursor-pointer"
            alt={product.title}
            onClick={() => onView(product.id)}
          />

          <h4 className="text-sm font-medium line-clamp-2 mb-1">
            {product.title}
          </h4>

          <p className="font-semibold text-gray-800">${product.price}</p>

          <small className="text-gray-500">⭐ {product.rating.rate}</small>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-blue-500 text-white py-1 text-sm rounded hover:bg-blue-600 transition"
            >
              Cart
            </button>
            <button
              onClick={() => onView(product.id)}
              className="flex-1 bg-gray-500 text-white py-1 text-sm rounded hover:bg-gray-600 transition"
            >
              View
            </button>
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-yellow-500 text-white py-1 text-sm rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-500 text-white py-1 text-sm rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
