var mongoose = require("mongoose");

var mediaSchema = mongoose.Schema({
    _id: String,
    fileName: String,
    fileSize: String,
    propertyRefId: String,
    type: String,
    created: String
});

module.exports = mongoose.model("Media", mediaSchema);
