const contactModel = require("../models/ContactModel");

exports.sendContactData = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await contactModel.create(reqBody);
        return res.status(201).json({
            status: "success",
            msg: "Data send successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


exports.allContactData = async (req, res) => {
    try {
        let data = await contactModel.find().sort({
            createdAt: -1
        });

        if (data.length === 0) {
            return res.status(404).send({
                status: "fail",
                msg: "Data not found"
            })
        }

        return res.status(200).send({
            status: "success",
            msg: data
        })


    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Something went wrong"
        })
    }
}

exports.statusUpdate = async (req, res) => {
    try {
        // Extracting the id from request parameters
        const id = req.params.id;

        // Defining the filter for MongoDB query
        const filter = { _id: id };

        // Fetching the existing document based on the filter
        const data = await contactModel.findOne(filter);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID."
            });
        }

        // Toggle the status field
        const updateData = data.status === true ? false : true;

        // Update the document with the toggled status
        const statusUpdate = await contactModel.findByIdAndUpdate(
            id,
            { $set: { status: updateData } },
            { new: true } // Return the updated document
        );

        // Sending a success response with the updated document
        return res.status(200).json({
            success: true,
            message: "Status updated successfully.",
            data: statusUpdate
        });
    } catch (error) {
        console.error("Error in statusUpdate:", error);
        // Sending an error response
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the status.",
            error: error.message
        });
    }
};

