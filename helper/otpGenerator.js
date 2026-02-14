const otpGenerator = require('otp-generator')

exports.otpGenerator = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: true, digits: true });
}