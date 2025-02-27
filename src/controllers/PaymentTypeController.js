const { successResponse, errorResponse } = require("../helper/response");
const paymentTypeModel = require("../models/PaymentTypeModel");

exports.createPaymentType = async (req, res) => {
    try {
        const reqBody = req.body;
        const data = await paymentTypeModel.create(reqBody);
        return successResponse(res, 201, "Payment type created successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};


exports.allPaymentType = async (req, res) => {
    try {
        let data = await paymentTypeModel.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return errorResponse(res, 404, "Payment type not found", null);
        }
        return successResponse(res, 200, "Data fetch successfully", data)
    } catch (error) {
        return errorResponse(res, 500, "something went wrong", error);
    }
};


exports.singlePayment = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        let data = await paymentTypeModel.findOne(filter);
        if (!data) {
            return errorResponse(res, 404, "Payment type not found", null);
        }
        return successResponse(res, 200, "Single payment type fetch successfully", data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
        
    }
};