var mongoose = require("mongoose");

var locationSchema = mongoose.Schema({
    _id: String,
    safeName: String,
    name: String,
    body: String
});

module.exports = mongoose.model("Location", locationSchema);
