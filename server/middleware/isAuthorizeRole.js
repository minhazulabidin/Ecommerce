const { apiResponse } = require("../utilities/apiResponse")

exports.isAuthorizeRole = (...role) => {
    return (req, res, next) => {
        if (role.includes(req.session.user.role)) {
            next();
        } else {
            apiResponse(401, res, "Access denied")
        }
    }
}