const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        img: { type: String },
        title: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const BannerModel = mongoose.model('banner', DataSchema);
module.exports = BannerModel;