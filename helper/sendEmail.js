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
        subject: "Verify your email address",
        text: "Hello world?",
        html: `<!doctypehtml><html lang=en><meta charset=UTF-8><title>Email Verification</title><style>body{margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#333}.container{max-width:520px;margin:40px auto;background-color:#fff;border-radius:6px;padding:30px}.heading{font-size:20px;margin-bottom:15px}.text{font-size:15px;line-height:1.6;margin-bottom:20px}.otp-box{text-align:center;margin:25px 0}.otp{display:inline-block;padding:12px 24px;font-size:24px;letter-spacing:4px;font-weight:700;background-color:#f0f2f5;border-radius:4px;color:#000}.footer{font-size:13px;color:#777;margin-top:30px}</style><div class=container><div class=heading>Hi ${fullName},</div><div class=text>You’re almost done.</div><div class=text>Use the code below to verify your email address. This code is valid for the next 10 minutes.</div><div class=otp-box><div class=otp>${otp}</div></div><div class=text>If you didn’t request this, you can safely ignore this email. Nothing will change unless the code is used.</div><div class=footer>Thanks,<br>${fullName} Team</div></div>`,
    });
}

module.exports = sendEmail;