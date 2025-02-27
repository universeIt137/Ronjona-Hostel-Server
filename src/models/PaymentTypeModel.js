const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const paymentTypeSchema = new Schema({
    paymentName: {
        type : String
    }
}, { timestamps: true, versionKey: false });

const paymentTypeModel = model("payment-type", paymentTypeSchema);


module.exports = paymentTypeModel;