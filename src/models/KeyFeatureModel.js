const mongoose = require("mongoose");


const { Schema, model } = mongoose;


const keyFeatureSchema = new Schema({
    images: [
        {
            img: {
                type: String,
            },
        }
    ],
    features: [
        {
            title: {
                type: String
            }
        }
    ],
    facilities: [
        {
            title: {
                type: String
            }
        }
    ]

}, { timestamps: true, versionKey: false });


const keyFeatureModel = model("key-features", keyFeatureSchema);


module.exports = keyFeatureModel;