const express = require("express");
const app = express();

app.use("/special/*", function(req, res, next) {
    console.log("You reached the special area.")
    next();
})

app.use("/:route", function(req, res, next) {
    console.log(req.method + " /" + req.params.route + " " + res.statusCode);
    next();
})

app.get("/", function(req, res) {
    res.send("Hello there!");
})

app.get("/news", function(req, res) {
    res.send("I have good news and bad news...");
})

app.listen(3000, function() {
    console.log("server listening");
})
