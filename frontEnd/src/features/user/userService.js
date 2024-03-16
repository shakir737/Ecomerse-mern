import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getUser = async (id) => {
  const response = await axios.post(
    `${base_url}user/getUser/${id}`,
    "",
    config
  );
  return response.data;
  }

  const createWishlist = async (id) => {
  
    const response = await axios.post(
      `${base_url}user/userwishlist`,
      {id},
      config
    );
  return response.data;
};

const removeWishlist = async (id) => {
  
  const response = await axios.post(
    `${base_url}user/removeWishlist`,
    {id},
    config
  );
return response.data;
};

const createCart = async (data) => {
  
  const response = await axios.post(
    `${base_url}user/usercart`,
    {data},
    config
  );

return response.data;
};

const updateCart = async (data) => {
  
  const response = await axios.post(
    `${base_url}user/updateCart`,
    {data},
    config
  );

return response.data;
};

const removeCart = async (id, count) => {
  
  const response = await axios.delete(`${base_url}user/removecart/${id}`, config);

return response.data;
};
const userService = {
  getUser,
  createWishlist,
  removeWishlist,
  createCart,
  removeCart,
  updateCart,
};

export default userService;
