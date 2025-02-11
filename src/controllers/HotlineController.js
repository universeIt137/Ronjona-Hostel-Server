const { successResponse, errorResponse } = require("../helper/response");
const hotlineModel = require("../models/HotlineModel");

exports.uploadHotline = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await hotlineModel.create(reqBody);
        return successResponse(res, 201, "Data upload successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};
