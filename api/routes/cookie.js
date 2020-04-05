const express = require("express");
const router = express.Router();
const CookieMessage = require('../models/cookie_message.js');

router.get("/", function(req, res, next) {

   CookieMessage.countDocuments().exec(function(err, count) {

      if (err) {
         res.send({err: err.message});
      }
      else {
         var random = Math.floor(Math.random() * count);

         CookieMessage.findOne().skip(random).exec(
            function(err, result) {
               if (err) {
                  res.send({err: err.message});
               }
               else {
                  res.send({message: result.message});
               }
            }
         );
      }
   });
});

router.post("/", function(req, res, next) {

   CookieMessage.create(req.body).then(function(cookieMessage) {
      res.send(cookieMessage);
   }).catch(next);
});

module.exports = router;
