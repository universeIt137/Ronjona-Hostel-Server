const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const contactSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    phone_number: {
        type : String
    },
    status: {
        type: Boolean,
        default : false
    }
},{timestamps:true,versionKey:false});



const contactModel = model("contacts", contactSchema);


module.exports = contactModel;