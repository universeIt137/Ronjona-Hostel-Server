const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const termCondictionSchema = new Schema({
    desc: {
        type: String

    }
}, { timestamps: true, versionKey: false });


const termCondictionModel = model("term-condiction", termCondictionSchema);

module.exports = termCondictionModel;