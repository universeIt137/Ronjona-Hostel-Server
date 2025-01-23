const { default: mongoose, model } = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        img: { type: [String] }, // Array of strings for images
        video: { type: String }, // Optional video URL
        features: [
            {
                featilityTitle: { type: String },
                featilityImg: { type: String }
            }
        ], // Array of objects for features
        title: { type: String },
        desc: { type: String },
        price: { type: String },
        location: { type: String },
        branch: { type: mongoose.Schema.Types.ObjectId, ref: "branches" },
        bannerImage: {
            type: String
        },
        locationLink: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PackageModel = mongoose.model('packages', DataSchema);
module.exports = PackageModel;
