var express = require("express");
var router = express.Router();
var User = require("../models/user");

// GET: return all users
router.get("/", function(req, res) {
  var query = {};
  User.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = {
        error: true,
        message: "Error fetching data"
      };
    } else {
      response = {
        data: data
      };
    }
    res.json(response);
  });
});

module.exports = router;
