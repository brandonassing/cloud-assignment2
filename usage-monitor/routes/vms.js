var express = require("express");
var router = express.Router();
const Vm = require("../models/Vm");

// GET: Retrieve all vms.
router.get("/", function(req, res, next) {
  Vm.find({}, (err, vm) => {
    console.log("get request");
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(vm);
  });
});

// POST: Create a VM
router.post("/", function(req, res) {
  console.log("post request");
  console.log(req);
  let newVm = new Vm();
  newVm.save((err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(vm);
  });
});

module.exports = router;
