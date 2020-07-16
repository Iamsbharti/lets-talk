const mongoose = require("mongoose");
let schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
    required: true,
  },
  tokenSecret: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Auth", schema);
