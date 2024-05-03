const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      
    },
    transitionId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    orderDetail:[
      { 
        product: {
          type: String
        },
         cartDetail:[
          {
          quantity: {
            type: Number,
          },
          color: {
            type: String,
          },
          price: {
            type: Number,
          },
          orderQuantity: {
            type: Number,
            
          },
      }]
        
      },
    ],
    orderby:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
