const otpGenerator = require('otp-generator')

const otpNumber = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
}

module.exports = otpNumber;