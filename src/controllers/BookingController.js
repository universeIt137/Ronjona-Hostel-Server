const { successResponse, errorResponse } = require("../helper/response");
const bookingModel = require("../models/BookingModel");


exports.createBooking = async (req, res) => {
    const reqBody = req.body;
    try {
        const data = await bookingModel.create(reqBody);
        return res.status(201).json({
            status: "success",
            msg: "Booking data upload successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong",
        })
    }
};

exports.manageBookingPackages = async (req, res) => {
    try {

        // join packages model

        const joinWithPakagesModel = {
            $lookup: {
                from: "packages", // Collection you want to join with
                localField: "packagesId", // Field from the current collection
                foreignField: "_id", // Field from the 'packages' collection
                as: "packageDetails" // Alias for the result of the join
            }
        };

        // join branch model

        const joinWithBranchId = {
            $lookup: {
                from: "branches",
                localField: "packageDetails.branch",
                foreignField: "_id",
                as: "branchDetails"
            }
        }

        // join  location model

        const joinWithLocationModel = {
            $lookup: {
                from: "locations",
                localField: "branchDetails.location",
                foreignField: "_id",
                as: "locationDetails"
            }
        }

        // unwind

        const packagesUnwind = {
            $unwind: "$packageDetails" // Correctly specify the field path with $
        };
        // unwind branchDetails
        const branchUnwind = {
            $unwind: "$branchDetails" // Correctly specify the field path with $
        };
        // unwind location

        const locationUnwind = {
            $unwind: "$locationDetails" // Correctly specify the field path with $
        };



        const data = await bookingModel.aggregate([joinWithPakagesModel, packagesUnwind, joinWithBranchId, branchUnwind, joinWithLocationModel, locationUnwind])

        return successResponse(res, 200, "Data fetched successfully", data);
    } catch (error) {
        console.error("Error fetching booking packages:", error); // Log detailed error
        return errorResponse(res, 500, "Something went wrong", error.message || error);
    }
};
