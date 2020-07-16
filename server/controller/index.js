const User = require("../models/User");
const {
  response,
  hashedPassword,
  compareHashedPwd,
  generateToken,
} = require("../lib");
exports.loginControl = async (req, res) => {
  console.log("login control control");
  const { email, password } = req.body;
  //find user
  const emailExistence = async () => {
    console.log("email existence call");
    let user = await User.findOne({ email: email });
    //console.log(user.password);
    return !user
      ? Promise.reject(response(true, 404, "user doesn't exists", email))
      : Promise.resolve(user);
  };
  //credmatch
  const credentialMatch = async (user) => {
    let credMatch = await compareHashedPwd(user.password, password);
    if (credMatch) {
      /** delete additional properties of user*/
      let userDetails = user.toObject();
      delete userDetails.password;
      delete userDetails.__v;
      delete userDetails._id;
      return Promise.resolve(userDetails);
    } else {
      return Promise.reject(
        response(true, 400, "Password Doesn't match", null)
      );
    }
  };
  //generate token
  const getToken = async (userDetails) => {
    let getTokenRes;
    await generateToken(userDetails, (error, tokenDetails) => {
      if (error !== null) {
        getTokenRes = Promise.reject(
          response(true, 500, "Token Generation Error", error)
        );
      } else {
        tokenDetails.userDeatils = userDetails;
        getTokenRes = Promise.resolve(tokenDetails);
      }
    });
    return getTokenRes;
  };
  //save token
  const saveToken = async (tokenDetails) => {
    console.log("save token", tokenDetails);
  };
  //login func start
  emailExistence()
    .then(credentialMatch)
    .then(getToken)
    .then(saveToken)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
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
