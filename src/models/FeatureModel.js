const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        title: { type: String },
        logo: {type: String},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const FeatureModel = mongoose.model('features', DataSchema);
module.exports = FeatureModel;