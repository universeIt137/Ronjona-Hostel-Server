const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const aboutSchema = new Schema({

    shortDes: {
        type: String
    },
    img: {
        type: String
    },
}, { timestamps: true, versionKey: false });



const aboutModel = model("about", aboutSchema);

module.exports = aboutModel