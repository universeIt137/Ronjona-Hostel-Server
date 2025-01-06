const PhotoGalleryModel = require("../models/PhotoGalleryModel")

exports.uploadPhoto = async (req, res) => {
    try {
        const result = await PhotoGalleryModel.create(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to upload photo", error });
    }
}

exports.getAllPhoto = async (req, res) => {
    try {
        const result = await PhotoGalleryModel.find();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch photo" });
    }
}

exports.getPhotoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PhotoGalleryModel.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch feature" });
    }
}

exports.updatePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PhotoGalleryModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to update", error})
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PhotoGalleryModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }

        res.status(200).json({
            success: true,
            message: "Photo deleted successfully"
        })

    } catch (error) {
       res.status(500).json({success: false, message: "Failed to delete Feature"}) 
    }
}