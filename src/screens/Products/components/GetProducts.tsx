import { useQuery } from "@tanstack/react-query";
import{ fetchProducts} from "../lib/FetchProducts"
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

//component
export function GetProducts() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts, //api 
  });

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
      </div>
    ))}
  </div>
</div>

  );
}

