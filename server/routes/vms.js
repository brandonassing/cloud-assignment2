var express = require("express");
var router = express.Router();

// Variable end point for environments
var config = require("../config/config.js");

// HTTP module
const request = require("request");

// GET: return
router.get("/", function(req, res) {
  // Build HTTP object
  var options = {
    method: "GET",
    url: config["cloud-usage-monitor"] + "/vms?ccId=" + req.query.ccId,
    json: true
  };

  // Send HTTP object
  request(options, function(error, response, body) {
    if (error) {
      res.status(500);
      res.send("error yo");
    } else {
      res.send(body);
    }
  });
});

// POST: Create new VM
router.post("/", function(req, res) {
  // Build HTTP object
  var body = req.body;

  var options = {
    body: body,
    method: "POST",
    url: config["cloud-usage-monitor"] + "/vms",
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

// PUT: start a VM
router.put("/start/:_id", function(req, res) {
  // Build HTTP object
  var body = {};

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/vms/start/" + req.params._id,
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

// PUT: Stop a VM
router.put("/stop/:_id", function(req, res) {
  // Build HTTP object
  var body = {};

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/vms/stop/" + req.params._id,
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

// PUT: Upgrade a VM
router.put("/upgrade/:_id", function(req, res) {
  // Build HTTP object
  var body = {};

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/vms/upgrade/" + req.params._id,
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

// PUT: Downgrade a VM
router.put("/downgrade/:_id", function(req, res) {
  // Build HTTP object
  var body = {};

  var options = {
    body: body,
    method: "PUT",
    url: config["cloud-usage-monitor"] + "/vms/downgrade/" + req.params._id,
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

// DELETE:
router.delete("/:_id", function(req, res) {
  // Build HTTP object
  var body = {};

  var options = {
    body: body,
    method: "DELETE",
    url: config["cloud-usage-monitor"] + "/vms/" + req.params._id,
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

module.exports = router;
