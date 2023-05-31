const express = require("express");
const router = express.Router();
const librosController = require("../controllers/librosController");

router.get('/', librosController.list);

router.get('/detail/:id', librosController.detail);
router.get("/add", librosController.add);
router.post("/create", librosController.create);
router.get("/edit/:id", librosController.edit);
router.post("/update/:id", librosController.update);
router.get('/delete/:id', librosController.delete);
router.delete('/delete/:id', librosController.destroy);






module.exports = router;
