import type { Product } from "../Productsdata";

interface ViewProductProps {
  selectedProduct: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ViewProduct({
  selectedProduct,
  onClose,
  onAddToCart,
  onEdit,
  onDelete,
}: ViewProductProps) {
  if (!selectedProduct) return null;

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
      <button
        onClick={onClose}
        className="text-red-500 mb-4 hover:underline"
      >
        ← Close
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="h-64 w-full object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
          <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
          <p className="text-lg font-semibold mb-2">
            Price: ${selectedProduct.price}
          </p>
          <p className="text-gray-700 mb-2">
            Category: {selectedProduct.category}
          </p>
          <p className="mb-4">
            Rating: ⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(selectedProduct)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onEdit(selectedProduct)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(selectedProduct.id);
                onClose();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
