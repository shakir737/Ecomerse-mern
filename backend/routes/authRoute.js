const express = require("express");
const {
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
  authenticatedUser,
  loginWithCookie,
  createWishlist,
  removeWishlist,
  AddToCart,
  removeCart,
  updateUser,
  updateCart,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);
router.put("/updateUser/:id", updateUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/login-cookie/:user", loginWithCookie);
router.post("/admin-login", loginAdmin);
router.post("/getUser/:id", authMiddleware, getaUser);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/all-users", authMiddleware, getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.post("/signout", authMiddleware, logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.post("/userCart/:id", authMiddleware, AddToCart);
router.post("/updateCart", authMiddleware, updateCart);
router.delete("/removecart/:id", authMiddleware, removeCart);
router.post("/userwishlist", authMiddleware, createWishlist);
router.post("/removeWishlist", authMiddleware, removeWishlist);
router.post("/authenticateduser", authMiddleware, authenticatedUser);
router.get("/", authMiddleware, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/user/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.patch("/:id", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
