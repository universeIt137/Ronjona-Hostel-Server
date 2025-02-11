const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const hotlineSchema = new Schema({
    branchName: {
        type: String
    },
    hotlineNumber: {
        type: String
    }
}, { timestamps: true, versionKey: false });


const hotlineModel = model("hotline", hotlineSchema);

module.exports = hotlineModel;