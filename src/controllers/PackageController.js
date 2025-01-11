const PackageModel = require("../models/PackageModel");

// Create a new package
const createPackage = async (req, res) => {
    try {
        const newPackage = new PackageModel(req.body);
        await newPackage.save();
        res.status(201).json({ success: true, data: newPackage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create package", error });
    }
};

// Get all packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await PackageModel.find()
            .populate('branch')
            .populate({
                path: 'branch',
                populate: {
                    path: 'location',
                    model: 'locations' // Replace with the actual model name if different
                }
            });
            
            ;
        res.status(200).json({ success: true, data: packages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch packages", error });
    }
};

// Get a package by ID
const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await PackageModel.findById(id);
        if (!package) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }
        res.status(200).json({ success: true, data: package });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch package", error });
    }
};

// Update a package by ID
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPackage = await PackageModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPackage) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }
        res.status(200).json({ success: true, data: updatedPackage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update package", error });
    }
};

// Delete a package by ID
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackage = await PackageModel.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }
        res.status(200).json({ success: true, message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete package", error });
    }
};

module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
};
