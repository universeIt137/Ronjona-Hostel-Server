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
        const data = await bookingModel
            .find()
            .populate("packages", "name location") // Fetch only specific fields
            .sort({ createdAt: -1 }); // Sort by creation date

        if (!data || data.length === 0) {
            return successResponse(res, 200, "No booking packages found", null);
        }

        return successResponse(res, 200, "Data fetched successfully", data);
    } catch (error) {
        console.error("Error fetching booking packages:", error); // Log detailed error
        return errorResponse(res, 500, "Something went wrong", error.message || error);
    }
};
