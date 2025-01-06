const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        youtube_link: { type: String },
        video_link: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const VideoGalleryModel = mongoose.model('videoGallery', DataSchema);
module.exports = VideoGalleryModel;