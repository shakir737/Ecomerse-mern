const express = require("express");
const { getCities } = require("../controller/cityCtrl");

const router = express.Router();
router.get("/", getCities);

module.exports = router;
