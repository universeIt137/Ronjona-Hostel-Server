const VideoGalleryModel = require("../models/VideoGalleryModel")

exports.uploadVideo = async (req, res) => {
    try {
        const result = await VideoGalleryModel.create(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to upload", error})
    }
}

exports.getAllVideo = async (req, res) => {
    try {
        const result = await VideoGalleryModel.find();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch videos" });
    }
}

exports.getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await VideoGalleryModel.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch video" });
    }
}

exports.updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await VideoGalleryModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, messae: "Failed to update", error });
    }
}

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await VideoGalleryModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.status(200).json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
}