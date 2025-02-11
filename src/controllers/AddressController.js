const { successResponse, errorResponse } = require("../helper/response");
const addressModel = require("../models/AddressModel");

exports.uploadAddress = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await addressModel.create(reqBody);
        return successResponse(res, 201, "Data upload successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.allAddress = async (req, res) => {
    try {
        let data = await addressModel.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

exports.addressById = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await addressModel.findOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data fetch by id successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.addressUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const reqBody = req.body;
        const data = await addressModel.updateOne(filter, reqBody, { upsert: true });
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        };
        return successResponse(res, 200, "hotline update successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);

    }
};

exports.addressDelete = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await addressModel.deleteOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Data delete successfully", data)
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);

    }
};