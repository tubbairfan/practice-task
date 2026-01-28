import axios from "axios"
import {type Product} from "../screens/Products/Productsdata"

const API_BASE_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(API_BASE_URL);
  return res.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await axios.get<Product>(`${API_BASE_URL}/${id}`);
  return res.data;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await axios.post<Product>(API_BASE_URL, product);
  return res.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const res = await axios.put<Product>(`${API_BASE_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<{ success: boolean }> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return { success: true };
};