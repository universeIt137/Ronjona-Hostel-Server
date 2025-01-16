const offerModel = require("../models/OfferModel");


const CreateOffer = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await offerModel.create(reqBody);
        res.status(201).json({
            status: "success",
            msg: "Offer data upload successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


const AllOffer = async (req, res) => {
    try {
        let data = await offerModel.find().sort({
            createdAt: -1
        });
        if (data.length === 0) {
            return res.status(404).json({
                status: "fail",
                msg: "Data not found"
            })
        }
        return res.status(200).json({
            status: "success",
            msg: "Fetch all offer successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


const OfferById = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        let data = await offerModel.findOne(filter);
        if (!data) return res.status(404).json({
            status: "success",
            msg: "Data not found"
        });
        return res.status(200).json({
            status: "success",
            msg: "Data fetch successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};

const OfferUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = {
            _id: id
        };
        const reqBody = req.body;
        const update = reqBody;
        let data = await offerModel.updateOne(filter, update, { upsert: true });
        if (!data) return res.status(404).json({
            status: "fail",
            msg: "Data not found"
        });
        return res.status(200).json({
            status: "success",
            msg: "Offer update successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};

const OfferDelete = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await offerModel.deleteOne(filter);
        if (!data) return res.status(404).json({
            status: "fail",
            msg: "Data not found"
        })
        return res.status(200).json({
            status: "success",
            msg: `Data delete successfully`,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
}









module.exports = {
    CreateOffer,
    AllOffer,
    OfferById,
    OfferUpdate,
    OfferDelete
}