var express = require("express");
var router = express.Router();
const Vm = require("../models/vm");

// GET: return VMs for a user
router.get("/", function(req, res) {
  Vm.find({ ccId: req.query.ccId }, (err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(vm);
  });
});

// Get: return the usage metrics for a vm
// router.get("/usage", function(req, res) {
//   // -------------------- Talk to Mongo here --------------------
//   var response = {};
//   response.test = "get usage metrics";
//   res.send(response);
// });

// Get: retur the total charges for a vm
// router.get("/charges", function(req, res) {
//   // -------------------- Talk to Mongo here --------------------

//   var response = {};
//   response.test = "get charges";
//   res.send(response);
// });

// POST: Create new VM
router.post("/", function(req, res) {
  var vm = {
    name: req.body.name,
    ccId: req.body.ccId,
    creationDate: new Date(),
    tier: req.body.tier,
    running: false,
    usage: []
  };

  let newVm = new Vm(vm);
  newVm.save((err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(vm);
  });
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
router.put("/upgrade/:_id", function(req, res) {
  Vm.updateOne({ _id: req.params._id }, { $inc: { tier: 1 } }, function(err) {
    if (err) {
      res.send(err);
    }
    res.send({ _id: req.params._id });
  });
});

// PUT: Downgrade a VM
router.put("/downgrade/:_id", function(req, res) {
  Vm.updateOne({ _id: req.params._id }, { $inc: { tier: -1 } }, function(err) {
    if (err) {
      res.send(err);
    }
    res.send({ _id: req.params._id });
  });
});

// DELETE:
router.delete("/:_id", function(req, res) {
  Vm.deleteOne({ _id: req.params._id }, function(err) {
    if (err) {
      res.send(err);
    }
    res.send({ _id: req.params._id });
  });
});

module.exports = router;
