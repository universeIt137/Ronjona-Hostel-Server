const LocationModel = require("../models/LocationModel")


// create a new location 
const createLocation = async (req, res) => {
    try {
        const newLocation = new LocationModel(req.body);
        await newLocation.save();
        res.status(201).json({ success: true, data: newLocation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create location" });
    }
};


// get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.status(200).json({ success: true, data: locations });
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to fetch locations" })
    }
};


// Get a location by ID 

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await LocationModel.findById(id);
        if (!location) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }

        res.status(200).json({ success: true, data: location });

    } catch (error) {
        res.status(500).json({success: false, message: "Failed to fetch locations"})
    }
}


// Update a location by ID 
const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLocation = await LocationModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({success: false, message: "Location not found"})
        }

        res.status(200).json({ success: true, data: updatedLocation });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update location" });
    }
}

// Delete a location by ID 
const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocation = await LocationModel.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({ success: false, message: " Location not found" });
        }
        res.status(200).json({ success: true, message: "Location deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete location" })
    }
};

module.exports = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
}