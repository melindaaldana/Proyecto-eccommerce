const express = require("express");
const router = express.Router();

const librosController = require("../../controllers/api/librosApi")

router.get("/", librosController.list) 

module.exports = router;