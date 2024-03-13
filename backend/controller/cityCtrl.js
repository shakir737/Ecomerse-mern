const City = require("../models/cityModel");
const asyncHandler = require("express-async-handler");


const getCities= asyncHandler(async (req, res) => {
  try {
    const getcities = await City.find();
    res.json(getcities);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  
  getCities,
};
