const { successResponse, errorResponse } = require("../helper/response");
const paymentTypeModel = require("../models/PaymentTypeModel");

exports.createPaymentType = async (req, res) => {
    try {
        const reqBody = req.body;
        const data = await paymentTypeModel.create(reqBody);
        return successResponse(res, 201, "Payment type created successfully", data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
}