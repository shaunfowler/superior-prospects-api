const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const promBundle = require("express-prom-bundle");
// const metricsRoute = require("./routes/metrics");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const updatesRoute = require("./routes/updates");
const propertiesRoute = require("./routes/properties");

// Setup google auth strategy
require("./auth/passport.google");

// Connect to mongo
mongoose.Promise = global.Promise;

mongoose
    .connect("mongodb://sp_mongo/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Stack it upppp
const app = express();
app.use(bodyParser());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/*", promBundle({ includePath: true }));

// Express routes
// app.use("/metrics", metricsRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/updates", updatesRoute);
app.use("/properties", propertiesRoute);

// Health endpoint
app.get("/health", (req, res) => {
    res.sendStatus(200);
});

// Start express
const port = process.env.PORT || 4000;
console.log("Starting...");
app.listen(port, () => {
    console.log("Express server listening on port " + port);
});
