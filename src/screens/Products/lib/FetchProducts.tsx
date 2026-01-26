import axios from "axios"
import {type Product} from "../components/GetProducts"
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return res.data;
};