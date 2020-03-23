var express = require("express");
const bodyParser = require("body-parser");

var router = express.Router();

router.get("/", function(req, res, next) {
   res.send("Draw a watercolour of your pet.");
});

router.post("/", function(req, res) {
   console.log(req.body);
   res.send("Added new cookie message");
});

module.exports = router;
