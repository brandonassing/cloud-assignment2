var express = require("express");
var router = express.Router();
const User = require("../models/user");

// GET: Retrieve all users.
router.get("/", function(req, res, next) {
  User.find({}, (err, user) => {
    console.log("get request");
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
});

router.post("/", function(req, res) {
  console.log("post request");
  console.log(req);
  let newUser = new User();
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
});

module.exports = router;
