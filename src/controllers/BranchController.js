const { default: mongoose } = require("mongoose");
const { errorResponse, successResponse } = require("../helper/response");
const BranchModel = require("../models/BranchModel")

// Create a new branch 
const createBranch = async (req, res) => {
    try {
        const newBranch = await BranchModel.create(req.body);
        res.status(201).json({ success: true, data: newBranch });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            res.status(409).json({ success: false, message: "Branch with the same branch already exists" });
        } else {
            res.status(500).json({ success: false, message: "Failed to create branch", error });
        }
    }
};

// get all branches with location info populated
const getAllBranches = async (req, res) => {
    try {
        const branches = await BranchModel.find().populate('location').sort({
            createdAt: -1
        });
        res.status(200).json({ success: true, data: branches });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch branches" });
    }
};


// Get a branch by ID with location info populated 
const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await BranchModel.findById(id).populate('location');
        if (!branch) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        res.status(200).json({ success: true, data: branch });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch branch", error });
    }
};


// Update a branch by ID 
const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBranch = await BranchModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBranch) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        res.status(200).json({ success: true, data: updatedBranch });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update branch", error });
    }
};


// Delete a branch by ID 
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await BranchModel.findByIdAndDelete(id);
        if (!deletedBranch) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        res.status(200).json({ success: true, message: "Branch deleted successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete branch", error });
    }
};


// location by branch api

const locationByBranch = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            location: id
        };
        let data = await BranchModel.find(filter).sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Location not found", null)
        }
        return successResponse(res, 200, "Location fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", null)
    }
};


const locationByBranchName = async (req, res) => {

    try {
        let id = new mongoose.Types.ObjectId(req.params.id || null);
        const filter = {
            location: id
        };
        let data = await BranchModel.find(filter).sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Location not found", null)
        }
        return successResponse(res, 200, "Location fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", null);
    }

}






module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    locationByBranch,
    locationByBranchName
}