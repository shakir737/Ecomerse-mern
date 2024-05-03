const Order = require("../models/orderModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");



// Create a Order ----------------------------------------------

const createOrder = asyncHandler(async (req, res) => {
   
     const order = req.body.paymentInfo
    
   
      const newOrder = await Order.create(order);
      res.json(newOrder);
   
   
     
  });

  module.exports = { createOrder};
  