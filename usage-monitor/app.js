var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");

var userRouter = require("./routes/users");
var vmRouter = require("./routes/vms");

// Cloud Assignment 2 link
//const dbUri = "mongodb://main:se4455@main-shard-00-00-gkrza.mongodb.net:27017,main-shard-00-01-gkrza.mongodb.net:27017,main-shard-00-02-gkrza.mongodb.net:27017/test?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true";

// Cloud assignment 3 link: 
const dbUri = "mongodb://main:se4455@10.0.0.6:27017/Main";



const options = {
  dbName: "Main",
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbUri, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/vms", vmRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
