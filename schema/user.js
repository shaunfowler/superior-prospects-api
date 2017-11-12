var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: String,
    email: String
});

module.exports = mongoose.model("User", userSchema);
