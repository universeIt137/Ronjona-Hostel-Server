const FeatureModel = require("../models/FeatureModel")

const createFeature = async (req, res) => {
    try {
        const newFeature = await FeatureModel.create(req.body);
        res.status(201).json({ success: true, data: newFeature });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create branch", error });
    }
}

const getAllFeatures = async (req, res) => {
    try {
        const features = await FeatureModel.find().sort({
            createdAt : -1
        });
        res.status(200).json({ success: true, data: features });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch branches" });
    }
};

const getFeatureById = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await FeatureModel.findById(id);
        if (!feature) {
            return res.status(404).json({ success: false, message: "Feature not found" });
        }
        res.status(200).json({ success: true, data: feature });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch feature", error });
    }
}

const updateFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFeature = await FeatureModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFeature) {
            return res.status(404).json({ success: false, message: "Feature not found" });
        }

        res.status(200).json({ sucess: true, data: updatedFeature });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update feature", error });
    }
};


const deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeature = await FeatureModel.findByIdAndDelete(id);
        if (!deletedFeature) {
            return res.status(404).json({ success: false, message: "Feature not found" });
        }
        res.status(200).json({ success: true, message: "Feature deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete Feature" });
    }
}


module.exports = {
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    deleteFeature
}