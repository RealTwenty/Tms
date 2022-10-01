const { Schema, model } = require("mongoose");

const blacklistedData = new Schema({
    userID: String,
    reason: { type: String, default: "None" }
})

const saveClaimed = model("blacklist", blacklistedData);

module.exports = saveClaimed;