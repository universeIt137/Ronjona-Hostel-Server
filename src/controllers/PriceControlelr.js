const { successResponse, errorResponse } = require("../helper/response");
const priceModel = require("../models/PriceModel");


exports.createPrice = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await priceModel.create(reqBody);
        return successResponse(res, 201, "Data upload successfully", data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
}