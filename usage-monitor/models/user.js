var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: String,
    password: String,
    loggedIn: Boolean
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", UserSchema);
