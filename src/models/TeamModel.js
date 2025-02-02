const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String
    },
    role: {
        type: String
    },
    des: {
        type: String
    },
    img: {
        type: String
    },

}, { timestamps: true, versionKey: false });


const teamModel = model("team", teamSchema);


module.exports = teamModel;