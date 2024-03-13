const express = require("express");
const { getStates } = require("../controller/stateCtrl");

const router = express.Router();
router.get("/", getStates);

module.exports = router;
