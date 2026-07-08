const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add user
const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    addUser
};

// Update User
const updateUser = async (req, res) => {
    try {

        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        );

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
