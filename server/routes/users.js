var express = require("express");
var router = express.Router();

var config = require("../config/config.js");
const request = require("request");

// GET: return all users
router.get("/", function(req, res) {
  // Build HTTP object
  var options = {
    method: "GET",
    url: config["cloud-usage-monitor"] + "/users",
    json: true
  };

  // Send HTTP object
  request(options, function(error, response, body) {
    if (error) {
      res.status(500);
      res.send(error);
    } else {
      res.send(body);
    }
  });
});

// PUT: Login
router.put("/login", function(req, res) {
  // Build HTTP object
  var body = req.body;

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/users/login",
    json: true
  };

  // Send HTTP object
  request(options, function(error, response, body) {
    if (error) {
      res.status(500);
      res.send({ error: true, username: null });
    } else {
      res.send(body);
    }
  });
});

// PUT: Logout
router.put("/logout", function(req, res) {
  // Build HTTP object
  var body = req.body;

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/users/logout",
    json: true
  };

  // Send HTTP object
  request(options, function(error, response, body) {
    if (error) {
      res.status(500);
      res.send({ error: true });
    } else {
      res.send(body);
    }
  });
});

module.exports = router;
