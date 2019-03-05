var express = require("express");
var router = express.Router();
const Vm = require("../models/vm");

// GET: Return VMs for a user
router.get("/", function(req, res) {
  Vm.find({ ccId: req.query.ccId }, (err, vm) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(vm);
  });
});

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

// PUT: Start a VM
router.put("/start/:_id", function(req, res) {
  Vm.findOneAndUpdate(
    { _id: req.params._id },
    {
      running: true,
      $push: { usage: { startTime: new Date(), endTime: null } }
    },
    {
      new: true
    },
    function(err, vm) {
      if (err) {
        res.send(err);
      }
      res.send(vm);
    }
  );
});

// PUT: Stop a VM
router.put("/stop/:_id", function(req, res) {
  Vm.findOne({ _id: req.params._id }, function(err, vm) {
    if (err) {
      res.send(err);
    }
    vm.running = false;
    vm.usage[vm.usage.length - 1].endTime = new Date();
    vm.save();
    res.send(vm);
  });
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

// DELETE: Delete a VM
router.delete("/:_id", function(req, res) {
  Vm.deleteOne({ _id: req.params._id }, function(err) {
    if (err) {
      res.send(err);
    }
    res.send({ _id: req.params._id });
  });
});

module.exports = router;
