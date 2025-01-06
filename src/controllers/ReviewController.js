const ReviewModel = require("../models/ReviewModel")

exports.createReview = async (req, res) => {
    try {
        const newReview = await ReviewModel.create(req.body);
        res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create review" });
    }
}

exports.getAllReview = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.status(200).json({ success: true, data: reviews });

    } catch (error) {
        res.status(500).json({success: false, message: "Failed to fetch reviews"})
  }
};

exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewModel.findById(id);
        if (!review) {
            return res.status(404).json({ succes: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({success: false, message: " failed to fetch review", error})
    }
}

exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, data: updatedReview });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update feature", error });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deletedReview = await ReviewModel.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to delete review"})
    }
}