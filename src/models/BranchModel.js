const { default: mongoose } = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
        branch: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const BranchModel = mongoose.model('branches', DataSchema);
module.exports = BranchModel;
