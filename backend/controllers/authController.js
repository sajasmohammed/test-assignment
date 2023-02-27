const User = require('../models/userModel');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')

//register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let avatar;

        let BASE_URL = process.env.BACKEND_URL;

        if (req.file) {
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        }

        const user = await User.create({
            name,
            email,
            password,
            avatar
        });

        sendToken(user, 201, res)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email & password" });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        if (!await user.isValidPassword(password)) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        sendToken(user, 201, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//logout
exports.logoutUser = (req, res) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
            .status(200)
            .json({
                success: true,
                message: "Loggedout"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//get profile
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//change password
exports.changePassword = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('+password');
        //check old password
        if (!await user.isValidPassword(req.body.oldPassword)) {
            return res.status(401).json({ success: false, message: `Old password is incorrect ${req.params.id}` });
        }

        //assigning new password
        user.password = req.body.password;
        await user.save();
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        let newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        let avatar;
        let BASE_URL = process.env.BACKEND_URL;

        if (req.file) {
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
            newUserData = { ...newUserData, avatar }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get one user
exports.getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: `User not found with this id ${req.params.id}` })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// update users
exports.updateUser = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: `User not found with this id ${req.params.id}` })
        }
        await user.remove();
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
