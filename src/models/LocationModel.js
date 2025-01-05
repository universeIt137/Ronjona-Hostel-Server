const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        location: { type: String, unique: true, required: true },
        img: { type: String },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const LocationModel = mongoose.model('locations', DataSchema);
module.exports = LocationModel;
