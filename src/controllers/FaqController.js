const { successResponse, errorResponse } = require("../helper/response");
const faqModel = require("../models/FaqModel");

exports.createFaq = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await faqModel.create(reqBody);
        return successResponse(
            res,
            201, "Data upload successfully",
            data
        )
    } catch (error) {
        return errorResponse(
            res,
            500,
            "Something went wrong",
            error
        )
    }
};