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









module.exports = {
    CreateOffer,
    AllOffer
}