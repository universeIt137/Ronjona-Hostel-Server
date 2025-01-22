const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const faqSchema = new Schema({
    logo: {
        type : String
    },
    questions: {
        type : String,
    },
    answer: {
        type : String
    }
}, { timestamps: true, versionKey: false });



const faqModel = model("faq",faqSchema);

module.exports = faqModel;