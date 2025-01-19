const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String
    },
    role: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    img: {
        type : String
    },
    email: {
        type: String
    },
    experience: {
        type: String
    }
}, { timestamps: true, versionKey: false });


const teamModel = model("team", teamSchema);


module.exports = teamModel;