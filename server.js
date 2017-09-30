const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const session = require("express-session");

// Setup google auth strategy
require("./auth/passport.google");

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => console.error(err));

// Stack it upppp
var app = express();
// app.use(express.cookieParser());
app.use(bodyParser());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

// Express routes
app.use("/user", userRoute);
app.use("/auth", authRoute);

// Health endpoint
app.get("/health", (req, res) => {
    res.sendStatus(200);
});

// Start express
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Express server listening on port " + port);
});
