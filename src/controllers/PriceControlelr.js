const { successResponse, errorResponse } = require("../helper/response");
const priceModel = require("../models/PriceModel");


exports.createPrice = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await priceModel.create(reqBody);
        return successResponse(res, 201, "Data upload successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};


exports.allPrice = async (req, res) => {
    try {
        let data = await priceModel.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data)
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};