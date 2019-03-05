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

router.put("/logout", function(req, res) {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      loggedIn: false
    },
    {},
    function(err, user) {
      if (err || user == null) {
        res.send({ error: true });
      } else {
        res.send({ error: false });
      }
    }
  );
});

module.exports = router;
