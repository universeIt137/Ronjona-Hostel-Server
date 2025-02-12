const { default: mongoose } = require("mongoose");
const PackageModel = require("../models/PackageModel");
const { errorResponse, successResponse } = require("../helper/response");

// Create a new package
const createPackage = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await PackageModel.create(reqBody);
        return successResponse(res, 201, "Data upload successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
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
            }).sort({
                createdAt: -1
            })

            ;
        res.status(200).json({ success: true, data: packages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch packages", error });
    }
};


// Get a package by ID
const getPackageById = async (req, res) => {
    const { id } = req.params;

    try {
        // Convert `id` to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Aggregation Pipeline
        const packageData = await PackageModel.aggregate([
            {
                $match: { _id: objectId } // Match package by ID
            },
            {
                $lookup: {
                    from: "locations", // The collection to join
                    localField: "location", // Field in `packages`
                    foreignField: "_id", // Field in `locations`
                    as: "locationDetails" // Alias for joined data
                }
            },
            {
                $unwind: { path: "$locationDetails", preserveNullAndEmptyArrays: true } // Flatten array (optional)
            }
        ]);

        // If no package found
        if (!packageData || packageData.length === 0) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }

        // Send Response
        res.status(200).json({ success: true, data: packageData[0] });
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

const packagesByBranch = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            branch: new mongoose.Types.ObjectId(id)
            // branch : id
        }
        let data = await PackageModel.find(filter).sort({
            createdAt: -1
        })
        if (data.length === 0) {
            return res.status(404).json({
                status: "fail",
                msg: "Data not found"
            })
        }
        return res.status(200).json({
            status: "success",
            msg: "Data fetch successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


const branchByPackages = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            branch: id
        };
        const data = await PackageModel.find(filter).sort({
            createdAt: -1
        });
        if (data.length === 0) {
            return errorResponse(res, 404, "Packages not found", null);
        }
        return successResponse(res, 200, "Packages Fetch successfully", data)
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


const locationBranchPackages = async (req, res) => {
    try {
        const location = new mongoose.Types.ObjectId(req.params.location);
        const branch = new mongoose.Types.ObjectId(req.params.branch);
        const filter = {
            location: location,
            branch: branch
        };

        const data = await PackageModel.find(filter); // Corrected query

        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetched successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};




module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    packagesByBranch,
    branchByPackages,
    locationBranchPackages
};
