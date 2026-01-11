const userModel = require("../models/user.model");

exports.signupController = async (req, res) => {
    const { fullName, email, password, phone, address } = req.body;

    const user = new userModel({
        fullName, email, password, phone, address
    })
    await user.save()
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    });
}