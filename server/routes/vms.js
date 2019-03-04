var express = require("express");
var router = express.Router();

// Variable end point for environments
var config = require("../config/config.js")

// HTTP module
const request = require('request')


// GET: return all VMs
router.get("/all", function(req, res) {

  // Build HTTP object
  var options = {}  

  var options = { 
    method: 'GET',
    url: config["cloud-usage-monitor"] + "/vms/all",
    json: true 
  };

  // Send HTTP object
  request(options, function (error, response, body) {
    if (error) {
        res.status(500)
        res.send("error yo")
    }else{

      res.send(body)     
    }

  })
})

// Get: return the usage metrics for a vm
router.get("/usage", function(req, res) {

   // Build HTTP object
   var options = {}  

   var options = { 
     method: 'GET',
     url: config["cloud-usage-monitor"] + "/vms/usage",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// Get: retur the total charges for a vm
router.get("/charges", function(req, res) {

   // Build HTTP object
   var options = {}  

   var options = { 
     method: 'GET',
     url: config["cloud-usage-monitor"] + "/vms/charges",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// POST: Create new VM
router.post("/create", function(req, res) {
   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'POST',
     url: config["cloud-usage-monitor"] + "/vms/create",
     json: true 
   };

 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// PUT: start a VM
router.put("/start", function(req, res) {
   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'PUT',
     url: config["cloud-usage-monitor"] + "/vms/start",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// PUT: Stop a VM
router.put("/stop", function(req, res) {
   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'PUT',
     url: config["cloud-usage-monitor"] + "/vms/stop",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// PUT: Upgrade a VM
router.put("/upgrade", function(req, res) {

   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'PUT',
     url: config["cloud-usage-monitor"] + "/vms/upgrade",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

// PUT: Downgrade a VM
router.put("/downgrade", function(req, res) {
   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'PUT',
     url: config["cloud-usage-monitor"] + "/vms/downgrade",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});



// DELETE:
router.delete("/delete", function(req, res) {
   // Build HTTP object
   var options = {}  

   var body = {}
   body.model = "a model"

   var options = { 
     body: body,
     method: 'DELETE',
     url: config["cloud-usage-monitor"] + "/vms/delete",
     json: true 
   };
 
   // Send HTTP object
   request(options, function (error, response, body) {
     if (error) {
         res.status(500)
         res.send("error yo")
     }else{
 
       res.send(body)     
     }
 
   })
});

module.exports = router;
