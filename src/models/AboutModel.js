const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const aboutSchema = new Schema({
    title: {
        type : String
    },
    shortDes : {
        type : String
    },
    aboutFeatures: [
        {
            logo: {
                type : String,
            },
            title: {
                type : String
            },
            short_des: {
                type : String
            }
        }
    ],
    years: {
        type: Date,
    },
    img: {
        type : String
    },
    valueDes: {
        type : String
    },
    aboutTeamImg: [
        {
            img: {
                type : String
            },
            name: {
                type : String
            },
            role: {
                type : String
            }
        }
    ]
}, { timestamps: true, versionKey: false });



const aboutModel = model("about", aboutSchema);

module.exports = aboutModel