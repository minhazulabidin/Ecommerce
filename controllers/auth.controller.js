const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const { apiResponse } = require("../utilities/apiResponse");
const asyncController = require("../utilities/asyncController");

exports.signupController = asyncController(async (req, res) => {
    const { fullName, email, password, phone, address } = req.body;

    bcrypt.hash(password, 12, async function (err, hash) {
        if (err) {
            return apiResponse(res, 500, err);
        }
        const user = new userModel({
            fullName, email, password: hash, phone, address
        })
        await user.save()
        apiResponse(res, 201, "User registered successfully", user);
    });

})