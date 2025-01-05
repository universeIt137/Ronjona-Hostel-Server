const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        location: { type: String },
        img: {type: String},

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const LocationModel = mongoose.model('locations', DataSchema);
module.exports = LocationModel;