var express = require("express");
var router = express.Router();

// GET: return all VMs
router.get("/", function(req, res) {
  res.send("GET request to the homepage");
});

// POST: Create new VM
router.post("/", function(req, res) {
  res.send("POST request to the homepage");
});

// PUT:
router.put("/", function(req, res) {
  res.send("PUT request to homepage");
});

// DELETE:
router.delete("/", function(req, res) {
  res.send("DELETE request to homepage");
});

module.exports = router;
