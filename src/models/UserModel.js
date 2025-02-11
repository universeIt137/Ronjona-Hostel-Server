const { default: mongoose } = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        role: {
            type: String,
            enum: ["user", "admin", ""],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const UserModel = mongoose.model('users', DataSchema);
module.exports = UserModel;

