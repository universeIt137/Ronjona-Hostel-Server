const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const bookingSchema = new Schema({
    name: {
        type : String
    },
    phoneNumber: {
        type : String
    },
    packagesId: {
        type : mongoose.Types.ObjectId,
    },
    status: {
        type: Boolean,
        default : false
    },
    tran_id: {
        type : String
    }
}, { timestamps: true, versionKey: false });


const bookingModel = model("bookings",bookingSchema);


module.exports = bookingModel;