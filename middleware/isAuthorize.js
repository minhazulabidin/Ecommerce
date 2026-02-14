const { apiResponse } = require("../utilities/apiResponse")

exports.isAuthorize = (req, res, next) => {
    if (req.session.user?.login) {
        next()
    } else {
        return apiResponse(401, res, "Please login first")
    }
}