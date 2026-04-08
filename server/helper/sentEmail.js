const nodemailer = require("nodemailer");

const sentEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_AUTH_EMAIL,
            pass: process.env.EMAIL_AUTH_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL_AUTH_EMAIL,
        to: email,
        subject: "Verify your email address otp",
        text: "Hello world?",
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>OTP Verification</title></head><body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table width="100%" style="max-width:480px;background:#ffffff;margin:40px auto;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.08)"><tr><td style="padding:30px;text-align:center"><h2 style="margin:0 0 10px;color:#222;font-size:22px">OTP Verification</h2><p style="margin:0 0 20px;color:#555;font-size:14px">Your One-Time Password (OTP) is below. This code will expire in 5 minutes.</p><div style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#0d6efd;background:#f1f5ff;padding:12px 0;border-radius:6px;margin-bottom:20px">${otp}</div><p style="margin:0;color:#777;font-size:13px">If you did not request this code, please ignore this email.</p></td></tr><tr><td style="background:#f4f6f8;padding:12px;text-align:center;font-size:12px;color:#999;border-radius:0 0 8px 8px">© 2026 Your Company. All rights reserved.</td></tr></table></td></tr></table></body></html>
`
    });
}

module.exports = { sentEmail };