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
}