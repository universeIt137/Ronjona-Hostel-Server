const termsCondictionModel = require("../models/TermCondictionModel")


const postTermCondiction = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await termsCondictionModel.updateOne(
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


module.exports = {
    postTermCondiction
}