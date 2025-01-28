const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const refundSchema = new Schema({
    desc: {
        type: String

    }
}, { timestamps: true, versionKey: false });


const refundModel = model("refund", refundSchema);

module.exports = refundModel;