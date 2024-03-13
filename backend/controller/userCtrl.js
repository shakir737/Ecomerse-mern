const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./email");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  const email = req.body.email;
  console.log(email);
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      firstname: findUser?.firstname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 // const email = username;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if(!findAdmin || findAdmin.role != "admin")  throw new Error("EMAIL_NOT_FOUND");

 if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    // const expiresin = new Date(
    //   new Date().getTime() * 1.00000016
    // );
    const updateuser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true, },
    );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    // });
    res.json({
      _id: findAdmin?._id,
      Name: findAdmin?.firstname  +" "+ findAdmin?.lastname,
      token: generateToken(findAdmin?._id),
      
    });
  } else {
    throw new Error("INVALID_PASSWORD");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});
// user Authentication functionality
const authenticatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log( _id );
  try{
     const authuser = await User.findById( _id );
     if(authuser.refreshToken == ""){
      res.send(400);
     } else {
      res.send(200);
     }
  } catch (error) {
    throw new Error(error);
  }
})
// logout functionality

const logout = asyncHandler(async (req, res) => {
const { _id } = req.user;
const { refreshToken } = req.user;

  try{
    
    await User.findByIdAndUpdate(
      _id,
      {
        refreshToken: "",
      },
      { new: true, },
    );
    res.send(200);
  }
  catch (error) {
    throw new Error(error);
  }
  
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
     const updatedUser = await User.findByIdAndUpdate(
       id,
       {
         firstname: req?.body.firstname,
        // lastname: req?.body?.lastname,
         email: req?.body?.email,
         mobile: req?.body?.mobile,
       },
       {
         new: true,
       }
     );
     res.json(updatedUser);
   } catch (error) {
     throw new Error(error);
   }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  
  
   try {
     const updatedUser = await User.findByIdAndUpdate(
     _id,
     {
     country: req?.body?.data?.country,
     state: req?.body?.data?.state,
     city: req?.body?.data?.city,
     address: req?.body?.data?.Address,
     appartment: req?.body?.data?.Appartment,
     },
     {
      new: true,
    }
     );
      res.json(updatedUser);
   } catch (error) {
     throw new Error(error);
   }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Sign in with Cookies
const loginWithCookie = asyncHandler(async (req, res) => {
  const { user } = req.params;
  const decoded = jwt.decode(user, process.env.JWT_SECRET);
  try {
    const findAdmin = await User.findById(decoded.id);
    
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: user,
    });
  } catch (error) {
    throw new Error(error);
  }
})
const getaUser = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   const { id } = req.params;
   try {
     const getaUser = await User.findById(_id);
     res.json({
      getaUser,
    });
   } catch (error) {
    throw new Error(error);
   }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const createWishlist = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const { _id } = req.user;
   try {
    const prodInWishlist = await User.findOne({ wishlist: id });
    if(prodInWishlist) {
      res.status(409).send({
        success: false,           
        message: "Product Already In Wishlist",
      });
    } else{
      const updateuser = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: id },
        },
        { new: true }
       );
       res.json(updateuser);
    }
  } catch (error) {
      throw new Error(error);
    }
});

const removeWishlist = asyncHandler(async(req, res) => {
  
   const { id } = req.body;
   const { _id } = req.user;
    try {
    
      const updateuser = await User.findByIdAndUpdate(
        _id,
       {
        $pull: { wishlist: id },
        },
       { new: true }
      );
       res.json(updateuser);
    
  } catch (error) {
     throw new Error(error);
     }
 })
const AddToCart =asyncHandler(async(req, res) => {
  const { id } = req.body.data;
  const { _id } = req.user;
  const { cartDetail } = req.body.data;
  try {
            const updateuser = await User.findByIdAndUpdate(
           _id,
            {
             $push: {cart: {product: id, cartDetail: cartDetail}}
          
            },
            { new: true }
         );
     res.json(updateuser);
       } catch (error) {
      throw new Error(error);
     }
    }
);
 
const updateCart =asyncHandler(async(req, res) => {
  const { id, color, current } = req.body.data;
  const { _id } = req.user;
 
  try {
        const updatedUser = await User.findByIdAndUpdate({
          _id,
          "cart": {
            "$elemMatch": {
                "product": id, "cartDetail.color": color
            }
        }
        }
        , { "$set": { 
          "cart.$[outer].cartDetail.$[inner].orderQuantity": current
      } },
      { "arrayFilters": [
        { "outer.product": id },
        { "inner.color": color }
    ] },
    )
      if(updatedUser){
        res.json(updatedUser).status(200);
      }
      else {
        res.status(509).send({
          success: false,           
          message: "Some Thing is Missing",
        });
      }
       } catch (error) {
      throw new Error(error);
     }
    }
);
const removeCart = asyncHandler(async(req, res) => {
  const {id} = req.params;
  const { _id } = req.user;
  
  try {
    
      const updateuser = await User.findByIdAndUpdate(
        _id,
        {
           $pull: {cart: {product: id}}
          
        },
        { new: true }
       );
       res.json(updateuser);
  
  } catch (error) {
      throw new Error(error);
    }
})

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginWithCookie,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  authenticatedUser,
  createWishlist,
  removeWishlist,
  AddToCart,
  removeCart,
  updateUser,
  updateCart,
};
