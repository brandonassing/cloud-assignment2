var express = require("express");
var router = express.Router();
const User = require("../models/user");

// GET: Retrieve all users.
router.get("/", function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(users);
  });
});

router.post("/", function(req, res) {
  let newUser = new User();
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
});

module.exports = router;
