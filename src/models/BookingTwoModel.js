const mongoose = require("mongoose");
const {Schema,model } = mongoose;
const bookingSchema = new Schema({
    name: {
        type : String,
    },
    email: {
        type : String
    },
    phoneNumber: {
        type : String
    },
    
}, { timestamps: true, versionKey: false });


const bookingTwoModel = model("bookingTwo", bookingSchema);

module.exports = bookingTwoModel;