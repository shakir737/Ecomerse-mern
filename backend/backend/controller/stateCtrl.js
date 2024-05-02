const State = require("../models/stateModel");
const asyncHandler = require("express-async-handler");


const getStates= asyncHandler(async (req, res) => {
  try {
    const getStates = await State.find();
    res.json(getStates);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  
    getStates,
};
