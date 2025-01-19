const teamModel = require("../models/TeamModel");

exports.createTeam = async (req, res) => {
    try {
        const reqBody = req.body;
        const data = await teamModel.create(reqBody);
        return res.status(201).json({
            status: "success",
            msg: "Data upload",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


exports.getAllTeamMember = async (req, res) => {
    try {
        let data = await teamModel.find().sort({
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
            msg: "Fetch all data successfully",
            data: data
        })
    } catch (error) {

    }
};

exports.getTeamMemberById = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        let data = await teamModel.findOne(filter);
        if (!data) {
            return res.status(404).json({
                status: "fail",
            })
        }
        return res.status(200).json({
            status: 'success',
            msg: "Data fetch by id successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong"
        })
    }
};


exports.updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const reqBody = req.body;
        const data = await teamModel.updateOne(filter, reqBody, { new: true });
        if (!data) {
            return res.status(404).json({
                status: "fail",
                msg: "Data not found"
            })
        }
        return res.status(200).json({
            status: "success",
            msg: "Data update successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went"
        })
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await teamModel.deleteOne(filter);
        if (!data) {
            return res.status(404).json({
                status: "fail",
                msg: "Data not found"
            })
        }
        return res.status(200).json({
            status: "success",
            msg: "Data delete successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went"
        })
    }
}