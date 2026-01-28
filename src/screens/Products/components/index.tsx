import { useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import { AddProduct } from "./AddProduct";
import { ViewProduct } from "./ViewProduct";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "../Productsdata";

export function ProductsIndex() {
  const {
    products,
    isLoading,
    error,
    handleAddToCart,
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
    getProductById,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // Handle Add/Update Product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: { rate: 0, count: 0 },
    };

    if (editingId) {
      updateProductMutation.mutate({
        id: editingId,
        product: productData,
      });
    } else {
      addProductMutation.mutate(productData);
    }

    resetForm();
  };


  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setShowAddForm(false);
    setEditingId(null);
  };

 
  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

 
  const handleToggleForm = () => {
    if (showAddForm) {
      resetForm();
    } else {
      setShowAddForm(true);
      setEditingId(null);
    }
  };

 
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };


  const handleViewProduct = async (id: number) => {
    const product = await getProductById(id);
    setSelectedProduct(product);
  };

 
  const handleEditProduct = (product: Product) => {
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image,
    });
    setEditingId(product.id);
    setShowAddForm(true);
  };

  if (isLoading) return <h2 className="text-center p-5">Loading...</h2>;
  if (error) return <h2 className="text-center p-5 text-red-500">Something went wrong</h2>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">FakeStore Products</h1>
        <button
          onClick={handleToggleForm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showAddForm ? "Cancel" : "Add New Product"}
        </button>
      </div>

      <AddProduct
        showAddForm={showAddForm}
        editingId={editingId}
        formData={formData}
        onToggleForm={handleToggleForm}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <ViewProduct
        selectedProduct={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
