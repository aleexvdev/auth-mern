import otpGenerator from "otp-generator";

export const generateOTP = () => {
  let otpGenerated = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, digits: true, specialChars: false })
  return otpGenerated;
}
