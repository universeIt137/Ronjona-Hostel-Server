const { successResponse, errorResponse } = require("../helper/response");
const keyFeatureModel = require("../models/KeyFeatureModel")


exports.keyFeatureUpload = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await keyFeatureModel.updateOne(
            {},
            { $set: reqBody },
            { upsert: true }
        );
        return res.status(200).json({
            status: "success",
            msg: "Data uploaded",
            data: data
        });

    } catch (error) {
        console.error("Error in aboutDataUpload:", error);
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        });
    }
};




exports.keyFeatureData = async (req, res) => {
    try {

        let data = await keyFeatureModel.find();
        if (data.length === 0) return res.status(404).json({
            status: "fail",
            msg: "Data not found",
        })
        return res.status(200).json({
            status: "success",
            msg: "Data fetch by id successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
}


