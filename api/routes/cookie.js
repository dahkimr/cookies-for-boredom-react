const express = require("express");
const router = express.Router();
const CookieMessage = require('../models/cookie_message.js');

router.get("/", function(req, res, next) {

   CookieMessage.countDocuments().exec(function(err, count) {

      var random = Math.floor(Math.random() * count);

      CookieMessage.findOne().skip(random).exec(
         function(err, result) {
            console.log(result);
            console.log(result.message);
            res.send({message: result.message});
         }
      );
   });
});

router.post("/", function(req, res) {
   console.log(req.body);
   CookieMessage.create(req.body).then(function(cookieMessage) {
      res.send(cookieMessage);
   });
});

module.exports = router;
