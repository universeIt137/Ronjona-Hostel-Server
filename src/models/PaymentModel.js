const mongoose = require("mongoose");

const { Schema, model } = mongoose;




const paymentSchema = new Schema({
    logo: {
        type : String
    },
    paymentName: {
        type : String
    },
    phoneNumber: {
        type : String
    }
}, { timestamps: true, versionKey: false });


const paymentModel = model("payments", paymentSchema);


module.exports = paymentModel;