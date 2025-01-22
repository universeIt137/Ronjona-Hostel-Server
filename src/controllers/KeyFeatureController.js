const { successResponse, errorResponse } = require("../helper/response");
const keyFeatureModel = require("../models/KeyFeatureModel");


exports.createKeyFeature = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await keyFeatureModel.create(reqBody);
        return successResponse(
            res, 201, "Data upload successfully", data
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

exports.getAllKeyFeatures = async (req, res) => {
    try {
        let data = await keyFeatureModel.find().sort({
            createdAt: -1
        });
        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null)
        }
        return successResponse(res, 200, "Data fetch successfully", data);
    } catch (error) {
        return errorResponse(
            res,
            500,
            "Something went wrong",
            error
        )
    }
};

exports.keyFeatureFindById = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        let data = await keyFeatureModel.findOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null)
        }
        return successResponse(res, 200, "Data fetch by id successfully", data)
    } catch (error) {
        return errorResponse(
            res,
            500,
            "Something went wrong",
            error
        )
    }
};

exports.keyFeatureUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        const reqBody = req.body;
        const update = reqBody;
        const data = await keyFeatureModel.findByIdAndUpdate(filter, update, { upsert: true });
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
            "Key features update successfully",
            data
        );
    } catch (error) {
        return errorResponse(
            res,
            500,
            "Something went wrong",
            null
        )
    }
};

exports.deleteKeyFeature = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        let data = await keyFeatureModel.findByIdAndDelete(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Key features delete successfully", data);

    } catch (error) {
        console.log(error);
        return errorResponse(
            res, 500, "Something went wrong", error
        )
    }
};


exports.keyFeatureUpload = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await keyFeatureModel.updateOne(
            {},
            { $set: reqBody }, // Directly spread the `reqBody` to set its fields in the database
            { upsert: true }   // Create the document if it doesn't exist
        );
        return res.status(200).json({
            status: "success",
            msg: "Data uploaded",
            data: data
        });
    } catch (error) {
        console.error("Error in aboutDataUpload:", error); // Log the error for debugging
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        });
    }
}