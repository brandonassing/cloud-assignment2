var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("SE 4455 Cloud Usage Monitor - Cloud Boyz version 4.20");
});





module.exports = router;
