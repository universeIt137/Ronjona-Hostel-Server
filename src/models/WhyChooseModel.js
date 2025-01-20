const mongoose = require("mongoose");

const { Schema, model } = mongoose;



const choseSchema = new Schema({
    img: {
        type: String
    },
    backgroundImg: {
        type: String
    },
    title: {
        type: String
    },
    des: {
        type: String
    }
}, {
    timestamps: true, versionKey: false
});


const chooseModel = model("why-choose", choseSchema);


module.exports = chooseModel