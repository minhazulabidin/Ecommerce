exports.apiResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: statusCode >= 400 ? false : true,
        statusCode: statusCode,
        message: message,
        data: data
    })
}