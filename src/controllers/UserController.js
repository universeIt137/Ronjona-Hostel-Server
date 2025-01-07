const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;

        // Check if the email is already registered 
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new UserModel({
            name,
            phone,
            email,
            password: hashedPassword,
            role
        });

        // Save the admin user to the database 
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        // validate the role 
        const validRoles = ["user", "admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        // Find the user and update the role 
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: updatedUser, message: "User role updated" });

    } catch (error) {
        res.status(500).json({ success: false, message: 'failed to update user', error: error.message });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exits 
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is an admin 
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. Admins only" });
        }

        // Compare passwords 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


        // Generate token 
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role }}
        });

    } catch (error) {
        res.status(500).json({
            success: false, message: "Login failed", error: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.find();
        res.status(200).json({ success: true, message: "All user fetched successfully", result });
    } catch (error) {
        res.status(200).json({ success: false, message: "user fetching failed", error:error.message });
    }
}


exports.checkAdmin = (req, res) => {
    console.log(req.headers.role)
    res.status(200).json({ success: true, message: "Welcome, Admin!" })
}