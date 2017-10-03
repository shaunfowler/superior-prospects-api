const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const updatesRoute = require("./routes/updates");

// Setup google auth strategy
require("./auth/passport.google");

// Connect to mongo
mongoose.Promise = global.Promise;

mongoose.connection.on("disconnected", () => {
    console.log("awwwwww");
});

mongoose
    .connect("mongodb://sp_mongo/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Stack it upppp
var app = express();
app.use(bodyParser());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

// Express routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/updates", updatesRoute);

// Health endpoint
app.get("/health", (req, res) => {
    res.sendStatus(200);
});

// Start express
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Express server listening on port " + port);
});
