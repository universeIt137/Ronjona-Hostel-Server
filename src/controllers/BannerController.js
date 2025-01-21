const BannerModel = require("../models/BannerModel")

const createBanner = async (req, res) => {
    try {
        const newBanner = await BannerModel.create(req.body);
        res.status(201).json({ success: true, data: newBanner });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create banner", error });
    }
};

const getAllBanner = async (req, res) => {
    try {
        const banners = await BannerModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: banners });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch banner", error });
    }
}

const getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerModel.findById(id);
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        res.status(200).json({ success: true, data: banner });
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to fetch bannner", error });
    }
}

const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBanner = await BannerModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        res.status(200).json({ success: true, data: updatedBanner });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update banner", error });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBanner = await BannerModel.findByIdAndDelete(id);

        if (!deleteBanner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

        res.status(200).json({ success: true, message: "Banner deleted successfully" });

    } catch (error) {
        res.status(200).json({ success: false, message: "Failed to delete banner", error });
    }
};


module.exports = {
    createBanner,
    getAllBanner,
    getBannerById,
    updateBanner,
    deleteBanner
}