const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        img: { type: String },
        name: { type: String },
        review: {type: String},
        location: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ReviewModel = mongoose.model('reviews', DataSchema);
module.exports = ReviewModel;