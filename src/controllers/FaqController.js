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

exports.allFaq = async (req, res) => {
    try {
        let data = await faqModel.find().sort({
            createdAt: -1
        });
        if (data.length === 0) {
            return errorResponse(
                res,
                404,
                "Data not found",
                null
            )
        }
        return successResponse(
            res,
            200,
            "Data fetch successfully",
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

exports.faqById = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        let data = await faqModel.findOne(filter);
        if (!data) {
            return errorResponse(
                res,
                404,
                "Data not found",
                null
            )
        }
        return successResponse(
            res,
            200,
            "Data find successfully",
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


exports.faqUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const reqBody = req.body;
        const update = reqBody;
        let data = await faqModel.findByIdAndUpdate(filter, update, { new: true });
        if (!data) {
            return errorResponse(
                res, 404, "Data not found", null
            )
        }
        return successResponse(
            res,
            200,
            "Data update successfully",
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


exports.faqDelete = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        const data = await faqModel.deleteOne(filter);
        if (!data) {
            return errorResponse(
                res,
                404,
                "Data not found",
                null
            )
        }
        return successResponse(
            res,
            200,
            "Data delete successfully",
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
}