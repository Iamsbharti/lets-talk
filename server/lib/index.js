const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
exports.response = (error, status, message, data) => {
  let res = {
    error: error,
    status: status,
    message: message,
    data: data,
  };
  return res;
};
exports.hashedPassword = async (pwd) => {
  console.log("hash pwd");
  const salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(pwd, salt);
  return hashed;
};
exports.compareHashedPwd = async (hashedPwd, pwd) => {
  console.log("compare passwords");
  return await bcrypt.compare(pwd, hashedPwd);
};
exports.generateToken = async (data, cb) => {
  console.log("generate token");
  try {
    let tokenClaims = {
      jwtid: shortid.generate(),
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
      sub: "authToken",
      iss: "react-chat-app",
      data: data,
    };
    let tokenDetails = {
      authToken: jwt.sign(tokenClaims, process.env.TOKEN_SECRET),
    };
    cb(null, tokenDetails);
  } catch (error) {
    console.log("Token gen error", error);
    cb(error, null);
  }
};
