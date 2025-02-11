const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const addressSchema = new Schema({
    name: {
        type : String
    }
}, { timestamps: true, versionKey: false });


const addressModel = model("address", addressSchema);

module.exports = addressModel;