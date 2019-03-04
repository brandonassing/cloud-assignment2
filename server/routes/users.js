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

// PUt: Login
router.put("/login", function(req, res) {
  // Build HTTP object
  var options = {}  

  var body = {}
  body.model = "a model"

  var options = { 
    body: body,
    method: 'PUT',
    url: config["mongo-url"] + "optional",
    json: true 
  };

  // Send HTTP object
  request(options, function (error, response, body) {
    if (error) {
        res.status(500)
        res.send("error yo")
    }else{

      res.send(body)     
    }

  })
});

// PUT: Logout
router.put("/logout", function(req, res) {
  // Build HTTP object
  var options = {}  

  var body = {}
  body.model = "a model"

  var options = { 
    body: body,
    method: 'PUT',
    url: config["mongo-url"] + "optional",
    json: true 
  };

  // Send HTTP object
  request(options, function (error, response, body) {
    if (error) {
        res.status(500)
        res.send("error yo")
    }else{

      res.send(body)     
    }

  })
});

module.exports = router;
