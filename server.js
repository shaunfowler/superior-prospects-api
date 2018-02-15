const path = require("path");
const process = require("process");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const promBundle = require("express-prom-bundle");
const healthRoute = require("./routes/health");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const updatesRoute = require("./routes/updates");
const locationsRoute = require("./routes/locations");
const propertiesRoute = require("./routes/properties");
const mediaRoute = require("./routes/media");

// Warning message if auth is disabled
if (process.env.BYPASS_AUTH === "true") {
    console.log("\n\n*** RUNNING WITH AUTHENTICATION DISABLED ***\n\n");
}

// Setup google auth strategy
require("./auth/passport.google");

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://sp_mongo/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });

// Stack it upppp
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(session({ secret: "1afcfdfb-94a1-5d57-f3c3-b07b1a530ddb" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/*", promBundle({ includePath: true }));

// Serve the uplaods dir
app.use("/static", express.static(path.join(__dirname, "uploads")));

// Express routes
app.use("/health", healthRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/updates", updatesRoute);
app.use("/locations", locationsRoute);
app.use("/properties", propertiesRoute);
app.use("/media", mediaRoute);

// Start express
const port = process.env.PORT || 4000;
console.log("Starting service...");
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
