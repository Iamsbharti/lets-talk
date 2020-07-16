const User = require("../models/User");
const { response, hashedPassword, compareHashedPwd } = require("../lib");
exports.loginControl = async (req, res) => {
  console.log("login control control");
  const { email, password } = req.body;
  //check user existence
  let userExists = await User.findOne({ email: email });

  /**If not found return  */
  if (!userExists)
    return res
      .status(400)
      .send(response(true, 400, "User Not Found ,Register", email));

  /**credential match if user found */
  let validCred = await compareHashedPwd(userExists.password, password);
  if (!validCred)
    return res.status(400).json(true, 400, "Wrong Password", null);

  //generate token
  if (validCred) {
  }
  //save token
};
exports.test = async (req, res) => {
  console.log("test route");
  res.send("test works");
};
exports.registerControl = async (req, res) => {
  console.log("register control", req.body);
  const { firstName, lastName, email, password } = req.body;
  //check for any existing emails
  let userExists = await User.findOne({ email: email });
  if (userExists)
    return res.status(400).json(response(true, 400, "User Exists", email));
  let hashed = await hashedPassword(password);
  console.log("hashed", hashed);
  let newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashed,
  });
  console.log(newUser);
  await User.create(newUser, (error, user) => {
    console.log(error, user);
    if (error === null) {
      //delete additional items
      let usr_res = user.toObject();
      delete usr_res.password;
      delete usr_res._id;
      delete usr_res.__v;
      return res
        .status(200)
        .json(response(false, 200, "User Created Success", usr_res));
    } else {
      console.log(user);
      return res
        .status(500)
        .json(response(true, 500, "Error Creating User", error.message));
    }
  });
};
