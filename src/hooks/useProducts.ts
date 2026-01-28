import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/Products.services";
import { addToCart } from "../redux/slices/cartslice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../screens/Products/Productsdata";

export function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();


  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });


  const addProductMutation = useMutation({
    mutationFn: (product: Omit<Product, "id">) => addProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

 
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

 
  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });


  const getProductById = async (id: number) => {
    return await fetchProductById(id);
  };

  
  const handleAddToCart = (product: Product) => {
    const cartPayload = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    dispatch(addToCart(cartPayload));
  };

  return {
    // Queries
    products,
    isLoading,
    error,
    getProductById,

    // Mutations
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,

    // Handlers
    handleAddToCart,
  };
}
