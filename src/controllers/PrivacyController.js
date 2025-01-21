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
            createdAt : -1
        });
        res.status(200).json({ success: true, data: privacies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch packages", error });
    }
};

const getPrivacyById = async (req, res) => {
    try {
        const { id } = req.params;
        const privacy = await PrivacyModel.findById(id);
        if (!privacy) {
            return res.status(404).json({ success: false, message: "Privacy not found" });
        }
        res.status(200).json({success: true, data: privacy})
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to fetch privacy", error });
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


module.exports = {
    createPrivacy,
    getAllPrivacy,
    getPrivacyById,
    updatePrivacy,
    deletePrivacy
}