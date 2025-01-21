const { successResponse, errorResponse } = require("../helper/response");
const keyFeatureModel = require("../models/KeyFeatureModel");


exports.createKeyFeature = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await keyFeatureModel.create(reqBody);
        return successResponse(
            res,201,"Data upload successfully",data
        )
    } catch (error) {
        errorResponse(
            res,
            500,
            "Something went wrong",
            error
        )
    }
};