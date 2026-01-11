exports.globalErrorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let errors = {};
        // Iterate over the errors to extract messages
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
};