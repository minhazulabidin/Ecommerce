const userModel = require("../models/user.model");
const { apiResponse } = require("../utilities/apiResponse");

exports.signupController = async (req, res) => {
    const { fullName, email, password, phone, address } = req.body;

    const user = new userModel({
        fullName, email, password, phone, address
    })
    await user.save()
    apiResponse(res, 201, "User registered successfully", user);
}