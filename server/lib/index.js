const bcrypt = require("bcrypt");
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
  console.log("hash pwd", pwd);
  const salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(pwd, salt);
  return hashed;
};
