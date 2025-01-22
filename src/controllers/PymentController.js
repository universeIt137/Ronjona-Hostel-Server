const { successResponse, errorResponse } = require("../helper/response");
const paymentModel = require("../models/PaymentModel");



exports.cratePayment = async (req, res) => {
    try {
        const reqBody = req.body;
        let data = await paymentModel.create(reqBody);
        return successResponse(
            res,
            201,
            "Data upload successfully",
            data
        );
    } catch (error) {
        return errorResponse(
            res,
            500,
            "Something went wrong",
            error
        )
    }
};


exports.getAllPayment = async (req, res) => {
    try {
        let data = await paymentModel.find().sort({
            createdAt: -1
        });
        if (data.length === 0) {
            return (
                errorResponse(
                    res,
                    404,
                    "Data not found",
                    null
                )
            )
        }
        return successResponse(
            res,
            200,
            "Data fetch successfully",
            data
        )
    } catch (error) {
        return (
            errorResponse(
                res,
                404,
                "Something went wrong",
                error
            )
        )
    }
}