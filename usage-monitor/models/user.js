var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", UserSchema);
