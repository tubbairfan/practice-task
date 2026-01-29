import { useQuery} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
} from "../services/Products.services";
import { addToCart } from "../redux/slices/cartslice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../screens/Products/Productsdata";

export function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const cartPayload = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    };

    dispatch(addToCart(cartPayload));
  };

  return {
    products,
    isLoading,
    error,
    handleAddToCart,
  };
}
