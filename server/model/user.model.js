const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "marcentaizer"],
        default: "user"
    },
    otp: {
        type: String
    },
    otpExpire: {
        type: Date,
    },
    verify: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", userSchema);
