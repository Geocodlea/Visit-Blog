const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/index");

/* GET home page. */
router.get("/", IndexController.getHomePage);

module.exports = router;
