const { apiResponse } = require("../utilities/apiResponse")

exports.emailChecker = (email, res) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}