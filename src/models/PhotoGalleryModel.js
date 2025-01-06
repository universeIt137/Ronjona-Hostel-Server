const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        img: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PhotoGalleryModel = mongoose.model('photoGallery', DataSchema);
module.exports = PhotoGalleryModel