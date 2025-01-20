const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const vissionSchema = new Schema({
    missionTitle: {
        type: String
    },

    vissionTitle: {
        type: String
    },
    missionVissionTitle: {
        type: String
    },
    keyFeatures: [
        {
            des: {
                type: String
            }
        }
    ]
}, { timestamps: true, versionKey: false });


const missionVissionModel = model("missions", vissionSchema);

module.exports = missionVissionModel;