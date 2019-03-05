var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VmSchema = new Schema(
  {
    ccId: String,
    name: String,
    creationDate: Date,
    tier: Number,
    running: Boolean,
    usage: [
      {
        startTime: Date,
        endTime: Date
      }
    ]
  },
  { versionKey: false }
);

module.exports = mongoose.model("VM", VmSchema);
