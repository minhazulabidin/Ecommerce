const nodemailer = require("nodemailer");

const sendEmail = async (email, otp, fullName) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Your OTP Code</title><script src=https://cdn.tailwindcss.com></script><body class=bg-gray-100><div class="bg-white max-w-2xl mx-auto my-8 overflow-hidden rounded-lg shadow-md"><div class="px-8 bg-indigo-600 py-6"><h1 class="text-center font-bold text-3xl text-white">Your OTP Code</h1></div><div class=p-8><p class="text-gray-700 mb-6">Hello ${fullName},<p class="text-gray-700 mb-6">Your One-Time Password (OTP) for account verification is:<div class="mb-6 bg-gray-100 p-4 rounded-lg"><p class="text-center font-bold text-4xl text-indigo-600">${otp}</div><p class="text-gray-700 mb-6">This OTP is valid for <span class=font-semibold>2 minutes</span>. Please do not share this code with anyone.<p class="text-gray-700 mb-2">If you didn't request this code, please ignore this email.<p class=text-gray-700>Thank you for using our service!</div><div class="bg-gray-100 px-8 py-4"><p class="text-center text-gray-600 text-sm">© 2024 Your Company Name. All rights reserved.</div></div>`,
    });
}

module.exports = sendEmail;