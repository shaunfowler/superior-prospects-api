var express = require("express");
var mongoose = require("mongoose");
const locationsRoute = require("./routes/locations");

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => console.error(err));

// Setup express routes
var app = express();
app.use("/locations", locationsRoute);

// Health endpoint
app.get("/health", (req, res) => {
    res.sendStatus(200);
});

// Start express
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Express server listening on port " + port);
});
