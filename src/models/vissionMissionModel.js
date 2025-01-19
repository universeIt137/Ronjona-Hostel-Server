const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const missionSchema = new Schema({
    missionDes: {
        type: String
    },
    vissionDes: {
        type: String
    },
    keyFeatures: [
        {
            description: {
                type : String
            }
        }
    ]
}, { timestamps: true, versionKey: false });

const vissionMissionModel = model("vissionMission", missionSchema);

module.exports = vissionMissionModel;