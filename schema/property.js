var mongoose = require("mongoose");

var propertySchema = mongoose.Schema({
    _id: String,
    name: String,
    safeName: String,
    description: String,
    body: String,
    visible: Boolean,
    locationRefId: String,
    created: Date
});

module.exports = mongoose.model("Property", propertySchema);
