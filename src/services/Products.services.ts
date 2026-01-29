import axios from "axios"
import {type Product} from "../screens/Products/Productsdata"

const API_BASE_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(API_BASE_URL);
  return res.data;
};

