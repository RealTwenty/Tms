const { Schema, model } = require("mongoose");

const saveClaimedData = new Schema({
    _id: String,
    User: String
})

const saveClaimed = model("zoomonkey", saveClaimedData);

module.exports = saveClaimed;