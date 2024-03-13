import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCarts = async () => {
  const response = await axios.get(`${base_url}cart/`);

  return response.data;
};
const createCart = async (cart) => {
  const response = await axios.post(`${base_url}cart/`, cart, config);

  return response.data;
};
const removeFromCart = async (cart) => {
  
  const response = await axios.delete(`${base_url}user/removecart/${cart.id}`, config);

  return response.data;
};
const cartService = {
  getCarts,
  removeFromCart,
  createCart,
};

export default cartService;
