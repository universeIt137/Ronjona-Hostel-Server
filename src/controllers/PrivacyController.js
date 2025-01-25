const PrivacyModel = require("../models/PrivacyModel")

// Create a new Privacy 
const createPrivacy = async (req, res) => {
    try {
        const newPrivacy = new PrivacyModel(req.body);
        await newPrivacy.save();
        res.status(201).json({ success: true, data: newPrivacy });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create privacy", error });
    }
};

// Get all privacy
const getAllPrivacy = async (req, res) => {
    try {
        const privacies = await PrivacyModel.find().sort({
            createdAt: -1
        });
        res.status(200).json({ success: true, data: privacies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch packages", error });
    }
};

const getPrivacyById = async (req, res) => {
    try {

        let data = await PrivacyModel.find();
        if (data.length === 0) return res.status(404).json({
            status: "fail",
            msg: "Data not found",
        })
        return res.status(200).json({
            status: "success",
            msg: "Data fetch by id successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
}

const updatePrivacy = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPrivacy = await PrivacyModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPrivacy) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }

        res.status(200).json({ success: true, data: updatedPrivacy });

    } catch (error) {
        res.status(500).json({ success: false, message: "failed to update package", error });
    }
};

const deletePrivacy = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPrivacy = await PrivacyModel.findByIdAndDelete(id);

        if (!deletedPrivacy) {
            return res.status(404).json({ success: false, message: "Privacy not found" });
        }

        res.status(200).json({ success: true, message: "Privacy deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete privacy", error });
    }
};


const postPrivacy = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await PrivacyModel.updateOne(
            {},
            { $set: reqBody }, // Directly spread the `reqBody` to set its fields in the database
            { upsert: true }   // Create the document if it doesn't exist
        );
        return res.status(200).json({
            status: "success",
            msg: "Data uploaded",
            data: data
        });
    } catch (error) {
        console.error("Error in aboutDataUpload:", error); // Log the error for debugging
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        });
    }
}



module.exports = {
    createPrivacy,
    getAllPrivacy,
    getPrivacyById,
    updatePrivacy,
    deletePrivacy,
    postPrivacy
}