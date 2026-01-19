const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
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
        otp: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
