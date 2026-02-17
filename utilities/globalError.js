const { apiResponse } = require("./apiResponse");


exports.globalError = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        apiResponse(400, res, Object.values(errors)[0])
    } else if (error.message) {
        apiResponse(500, res, error.message)
    } else {
        apiResponse(500, res, "something went wrong")
    }
}