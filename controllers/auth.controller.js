const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const { apiResponse } = require("../utilities/apiResponse");
const asyncController = require("../utilities/asyncController");
const sendEmail = require("../helper/sendEmail");
const otpNumber = require("../helper/otpNumber");

exports.signupController = asyncController(async (req, res) => {
    const { fullName, email, password, phone, address, role } = req.body;

    bcrypt.hash(password, 12, async function (err, hash) {
        const existingUser = await userModel.findOne({ email });
        if (err) {
            return apiResponse(res, 500, err);
        } else if (existingUser) {
            return apiResponse(res, 400, "User already exists with this email");
        }
        const otp = otpNumber()
        const user = new userModel({
            fullName, email, password: hash, phone, address, role, otp
        })
        await user.save()
        sendEmail(email, otp, fullName);
        apiResponse(res, 201, "User registered successfully", user);
    });

})

exports.loginController = asyncController(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        apiResponse(res, 404, "User not found with this email");
    } else {
        bcrypt.compare(password, existingUser.password, function (err, result) {
            if (err) {
                apiResponse(res, 500, "Something went wrong");
            } else {
                if (!result) {
                    apiResponse(res, 401, "Invalid credentials");
                } else {
                    apiResponse(res, 200, "Login successful", existingUser);
                }
            }
        });
    }
})