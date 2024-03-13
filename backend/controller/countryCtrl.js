const Country = require("../models/countryModel");
const asyncHandler = require("express-async-handler");


const getCountries= asyncHandler(async (req, res) => {
  try {
    const getCountries = await Country.find();
  
    res.json(getCountries);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  
    getCountries,
};
