const { emailChecker } = require("../helper/emailChecker");
const { otpGenerator } = require("../helper/otpGenerator");
const { sentEmail } = require("../helper/sentEmail");
const userModel = require("../model/user.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const bcrypt = require('bcrypt');

exports.registration = asyncController(async (req, res) => {
    const { fullName, email, password } = req.body;
    const validEmail = emailChecker(email, res)
    if (!validEmail) {
        return apiResponse(400, res, "Invalid Email")
    } else {
        bcrypt.hash(password, 12, async function (err, hash) {
            const existingUser = await userModel.findOne({ email })
            if (err) {
                return apiResponse(500, res, err);
            } else if (existingUser) {
                return apiResponse(400, res, "User already exists");
            }
            const otp = otpGenerator();
            const user = new userModel({
                fullName, email, password: hash, otp
            })
            await user.save();
            sentEmail(email, otp)
            apiResponse(201, res, "User registration successfully", user);
        });
    }
})

exports.login = asyncController(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email })
    const validEmail = emailChecker(email, res)
    if (!validEmail) {
        apiResponse(400, res, "Invalid Email")
    } else {
        if (!existingUser) {
            return apiResponse(400, res, "User does not exist");
        } else {
            const match = await bcrypt.compare(password, existingUser.password);
            if (match) {
                const user = {
                    _id: existingUser._id,
                    fullName: existingUser.fullName,
                    email: existingUser.email,
                    role: existingUser.role,
                    login: true,
                }
                if (existingUser.role == "admin" || existingUser.role == "marcentaizer") {
                    req.session.cookie.maxAge = 60000 * 5;
                    req.session.user = user
                } else {
                    req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
                    req.session.user = user
                }
                apiResponse(200, res, "Login successful", user);
            } else {
                apiResponse(400, res, "Invalid credentials");
            }
        }
    }
})

exports.allUserController = asyncController(async (req, res) => {
    const users = await userModel.find({}).select("fullName email role")
    apiResponse(200, res, "All User", users);
})