const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        desc: {type: String}
    },
    {
        timestamps: true,
        versionKey: false
    }
) 

const PrivacyModel = mongoose.model('privacy', DataSchema);
module.exports = PrivacyModel;