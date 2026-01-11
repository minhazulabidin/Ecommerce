const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            require: [true, "Name is require"]
        },
        email: {
            type: String,
            require: [true, "Email is require"]
        },
        password: {
            type: String,
            require: [true, "Password is require"]
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "subadmin", "admin"],
            default: "user"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);