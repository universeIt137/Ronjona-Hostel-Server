const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    logo: {
        type: String
    },
    accountName: {
        type: String
    },
    accountNumber: {
        type: String
    },
    bankName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    branchName: {
        type: String
    }
}, { timestamps: true, versionKey: false });


const paymentModel = model("payments", paymentSchema);


module.exports = paymentModel;