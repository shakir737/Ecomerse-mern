import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getStatesList = async () => {
  const response = await axios.get(`${base_url}states`, config);

  return response.data;
};

const stateService = {
  
  getStatesList,

};

export default stateService;
