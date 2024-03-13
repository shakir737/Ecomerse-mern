import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCountriesList = async () => {
  const response = await axios.get(`${base_url}Countries`, config);

  return response.data;
};

const countryService = {
  
  getCountriesList,

};

export default countryService;
