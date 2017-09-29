var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.send({ msg: "It works!" });
});

app.get("/health", function(req, res) {
  res.sendStatus(200);
});

var port = process.env.PORT || 4000;
var server = app.listen(port, () => {
  console.log("Express server listening on port " + port);
});
