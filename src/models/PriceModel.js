const mongoose = require("mongoose");


const { Schema, model } = mongoose;


const priceSchema = new Schema({
    price: {
        type: String
    }
}, { timestamps: true, versionKey: false });


const priceModel = model("prices", priceSchema);


module.exports = priceModel;