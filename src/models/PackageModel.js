const { default: mongoose, model } = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        img: { type: [String], required: true }, // Array of strings for images
        video: { type: String, required: false }, // Optional video URL
        features: [
            { 
                featureTitle: { type: String, required: true },
                featureDesc: { type: String, required: true }
            }
        ], // Array of objects for features
        title: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        branch: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PackageModel = mongoose.model('packages', DataSchema);
module.exports = PackageModel;
