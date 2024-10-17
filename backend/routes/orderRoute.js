const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createOrder, getOrders } = require("../controller/orderCtrl");

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/order/:id", getOrders);

module.exports = router;
