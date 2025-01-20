const whyChooseDataUpload = require("../models/WhyChooseModel");



exports.whyChooseDataUpload = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await whyChooseDataUpload.updateOne(
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
};


exports.chooseDataById = async (req, res) => {
    try {
        
        let data = await whyChooseDataUpload.find();
        if (data.length===0) return res.status(404).json({
            status: "fail",
            msg : "Data not found",
        })
        return res.status(200).json({
            status: "success",
            msg: "Data fetch by id successfully",
            data : data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
}