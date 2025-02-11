const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        img: { type: [String] }, // Array of image URLs
        video: { type: String }, // Optional video URL
        features: [
            {
                featureTitle: { type: String }, // Fixed typo
                featureImg: { type: String }   // Fixed typo
            }
        ], // Array of objects for features
        title: { type: String, },
        desc: { type: String },
        price: { type: String },
        branch: { type: mongoose.Schema.Types.ObjectId, ref: "branches"},
        location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
        seatAvalible: {
            type: String,
            default: "Yes"
        },
        bannerImage: { type: String },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        versionKey: false
    }
);

const PackageModel = mongoose.model('packages', DataSchema);
module.exports = PackageModel;
