interface AddProductProps {
  showAddForm: boolean;
  editingId: number | null;
  formData: {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  };
  onToggleForm: () => void;
  onFormChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddProduct({
  showAddForm,
  editingId,
  formData,
  onFormChange,
  onSubmit,
}: AddProductProps) {
  if (!showAddForm) return null;

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) => onFormChange("title", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => onFormChange("price", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => onFormChange("category", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => onFormChange("image", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => onFormChange("description", e.target.value)}
          className="border p-2 rounded md:col-span-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 md:col-span-2"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
