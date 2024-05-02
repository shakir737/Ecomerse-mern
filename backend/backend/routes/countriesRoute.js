const express = require("express");
const { getCountries } = require("../controller/countryCtrl");

const router = express.Router();
router.get("/", getCountries);

module.exports = router;
