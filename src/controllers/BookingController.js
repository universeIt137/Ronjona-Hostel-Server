const { successResponse, errorResponse } = require("../helper/response");
const bookingModel = require("../models/BookingModel");
const bookingTwoModel = require("../models/BookingTwoModel");


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
        const data = await bookingModel.aggregate([
            {
                $lookup: {
                    from: "packages",
                    localField: "packagesId",
                    foreignField: "_id",
                    as: "packageDetails"
                }
            },
            { $unwind: { path: "$packageDetails", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "branches",
                    localField: "packageDetails.branch", // Ensure branch is the correct field in packages
                    foreignField: "_id",
                    as: "branchDetails"
                }
            },
            { $unwind: { path: "$branchDetails", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "locations",
                    localField: "branchDetails.location", // Ensure location is the correct field in branches
                    foreignField: "_id",
                    as: "locationDetails"
                }
            },
            { $unwind: { path: "$locationDetails", preserveNullAndEmptyArrays: true } }
        ]);

        return successResponse(res, 200, "Data fetched successfully", data);
    } catch (error) {
        console.error("Error fetching booking packages:", error);
        return errorResponse(res, 500, "Something went wrong", error.message || error);
    }
};


exports.bookingFromStatusUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await bookingModel.findOne(filter);
        const updateData = data.status ? false : true;
        const statusUpdate = {
            status: updateData
        };
        const updateStatusData = await bookingModel.updateOne(filter, { $set: statusUpdate }, { upsert: true });
        return successResponse(res, 200, "Status update successfully", updateStatusData)
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
}


exports.deleteFrom = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await bookingModel.deleteOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data delete successfully");
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


exports.bookingUpload = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await bookingTwoModel.create(reqBody);
        return successResponse(res, 201, "Booking successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

exports.allBookingData = async (req, res) => {
    try {
        let data = await bookingTwoModel.find().sort({ createdAt: - 1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

exports.bookingById = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await bookingTwoModel.findOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.bookingUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const reqBody = req.body;
        const data = await bookingTwoModel.updateOne(filter, reqBody, { upsert: true });
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data upload successfully", data);
    } catch (error) {

        return errorResponse(res, 500, "Something went wrong", error);


    }
};