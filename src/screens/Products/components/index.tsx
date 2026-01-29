import { useProducts } from "../../../hooks/useProducts";
import { ProductGrid } from "./ProductGrid";

export function ProductsIndex() {
  const {
    products,
    isLoading,
    error,
    handleAddToCart,
  } = useProducts();

  if (isLoading) return <h2 className="text-center p-5">Loading...</h2>;
  if (error) return <h2 className="text-center p-5 text-red-500">Something went wrong</h2>;

  return (
    <div className="p-5">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">FakeStore Products</h1>
      </div>

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
