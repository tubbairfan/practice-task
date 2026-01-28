import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../lib/FetchProducts"
import { addToCart } from "../../../redux/slices/cartslice"
import type { AppDispatch } from "../../../redux/store"

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export function GetProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleAddToCart = (product: Product) => {
    console.log("Button clicked! Product:", product);
    console.log("Dispatch function:", dispatch);
    
    const cartPayload = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    
    console.log("Dispatching:", cartPayload);
    dispatch(addToCart(cartPayload));
    console.log("Dispatch completed");
    
  }

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong</h2>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-6">FakeStore Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.map((product) => (
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

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}