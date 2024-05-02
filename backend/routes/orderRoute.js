const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createOrder } = require("../controller/orderCtrl");

const router = express.Router();

router.post("/create-order",createOrder);

module.exports = router;
