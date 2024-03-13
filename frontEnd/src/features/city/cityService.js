import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCitiesList = async () => {
  const response = await axios.get(`${base_url}cities`, config);

  return response.data;
};

const citiesService = {
  
  getCitiesList,

};

export default citiesService;
