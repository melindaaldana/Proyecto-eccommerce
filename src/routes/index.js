let express = require("express");
let router = express.Router();

router.get("/", function(req, res){
    res.render("index", {title: "Libreria Online 'El Gato Negro'"})
})

module.exports = router;