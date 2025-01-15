const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const offerSchema = new Schema({
    img: {
         type : String
    },
    link: {
        type : String
    }
}, { timestamps: true, versionKey: false });

const offerModel = model("offers", offerSchema);


module.exports = offerModel;