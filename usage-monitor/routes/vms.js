var express = require("express");
var router = express.Router();
const Vm = require("../models/Vm");

// GET: return all VMs from Mongo
router.get("/all", function(req, res) {
  Vm.find({}, (err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(vm);
  });
});

// Get: return the usage metrics for a vm
router.get("/usage", function(req, res) {
  // -------------------- Talk to Mongo here --------------------
  console.log(req);
  var response = {};
  response.test = "get usage metrics";
  res.send(response);
});

// Get: retur the total charges for a vm
router.get("/charges", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "get charges";
  res.send(response);
});

// POST: Create new VM
router.post("/create", function(req, res) {
  // -------------------- Talk to Mongo here --------------------
  console.log("post request");
  console.log(req);
  let newVm = new Vm();
  newVm.save((err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(vm);
  });

  console.log("made it to create");

  var response = {};
  response.test = "create a vm";
  res.send(response);
});

// PUT: start a VM
router.put("/start", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "start a vm";
  res.send(response);
});

// PUT: Stop a VM
router.put("/stop", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "stop a vm";
  res.send(response);
});

// PUT: Upgrade a VM
router.put("/upgrade", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "upgrade a vm";
  res.send(response);
});

// PUT: Downgrade a VM
router.put("/downgrade", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "downgrade a vm";
  res.send(response);
});

// DELETE:
router.delete("/delete", function(req, res) {
  // -------------------- Talk to Mongo here --------------------

  var response = {};
  response.test = "delete a vm";
  res.send(response);
});

module.exports = router;
