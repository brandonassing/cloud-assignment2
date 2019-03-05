var express = require("express");
var router = express.Router();
const User = require("../models/user");

// GET: Retrieve all users.
router.get("/", function(req, res, next) {
  console.log("HELO");
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(users);
  });
});

router.put("/login", function(req, res) {
  User.findOneAndUpdate(
    { username: req.body.username, password: req.body.password },
    {
      loggedIn: true
    },
    {},
    function(err, user) {
      if (err || user == null) {
        res.send({ error: true, username: null });
      } else {
        res.send({ error: false, username: user.username });
      }
    }
  );
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
