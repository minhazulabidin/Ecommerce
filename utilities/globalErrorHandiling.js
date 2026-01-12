const { apiResponse } = require("./apiResponse");

exports.globalErrorHandiling = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        apiResponse(res, 400, errors)
    } else if (error.message) {
        apiResponse(res, 500, error.message)
    } else {
        apiResponse(res, 500, "someting went wrong")
    }
}

