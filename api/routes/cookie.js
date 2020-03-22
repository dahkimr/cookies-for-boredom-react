var express = require("express");
var router = express.Router();

router.get("/get", function(req, res, next) {
   res.send("Draw a watercolour of your pet.");
});

module.exports = router;
