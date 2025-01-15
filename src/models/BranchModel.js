const { default: mongoose } = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
        img: { type:String },
        branch: { type: String, required: true, unique: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const BranchModel = mongoose.model('branches', DataSchema);
module.exports = BranchModel;
