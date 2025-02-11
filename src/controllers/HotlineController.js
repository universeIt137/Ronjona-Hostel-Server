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

exports.allNumber = async (req, res) => {
    try {
        let data = await hotlineModel.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

exports.hotlineById = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await hotlineModel.findOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch by id successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.hotlineUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const reqBody = req.body;
        const data = await hotlineModel.updateOne(filter, reqBody, { upsert: true });
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        };
        return successResponse(res, 200, "hotline update successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
        
    }
};

exports.hotlineDelete = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await hotlineModel.deleteOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res,200,"Data delete successfully",data)
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error  );
        
    }
}