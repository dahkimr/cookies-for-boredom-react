const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CookieMessageSchema = new Schema({
   message: {
      type: String,
      required: [true, 'Message field is required']
   }
});

const CookieMessage = mongoose.model('cookieMessage', CookieMessageSchema)

module.exports = CookieMessage;
