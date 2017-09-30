var mongoose = require("mongoose");

var updateSchema = mongoose.Schema({
    _id: String,
    body: String,
    created: Date
});

module.exports = mongoose.model("Update", updateSchema);
