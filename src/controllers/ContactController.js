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