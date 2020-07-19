const User = require("../models/User");
const {
  response,
  hashedPassword,
  compareHashedPwd,
  generateToken,
} = require("../lib");
const Auth = require("../models/Auth");

exports.loginControl = async (req, res) => {
  console.log("login control control");
  const { email, password } = req.body;
  //find user
  const emailExistence = async () => {
    console.log("email existence call");
    let user = await User.findOne({ email: email });
    console.log(user);
    return !user
      ? Promise.reject(response(true, 404, "user doesn't exists", email))
      : Promise.resolve(user);
  };
  //credmatch
  const credentialMatch = async (user) => {
    console.log("cred match");
    let credMatch = await compareHashedPwd(user.password, password);
    if (credMatch) {
      console.log("password matched");
      /** delete additional properties of user*/
      let userDetails = user.toObject();
      delete userDetails.password;
      delete userDetails.__v;
      delete userDetails._id;
      return Promise.resolve(userDetails);
    } else {
      console.log("password doesn't match");
      return Promise.reject(
        response(true, 400, "Password Doesn't match", null)
      );
    }
  };
  //generate token
  const getToken = async (userDetails) => {
    console.log("gene token");
    let getTokenRes;
    await generateToken(userDetails, (error, tokenDetails) => {
      if (error !== null) {
        console.log("error gen token");
        getTokenRes = Promise.reject(
          response(true, 500, "Token Generation Error", error)
        );
      } else {
        console.log("token generated", tokenDetails);
        tokenDetails.userDetails = userDetails;
        getTokenRes = Promise.resolve(tokenDetails);
      }
    });
    return getTokenRes;
  };
  //save token
  const saveToken = async (tokenDetails) => {
    let saveTokenRes;
    console.log("save token", tokenDetails);
    const { userDetails, authToken } = tokenDetails;
    const { email } = userDetails;
    const tokenSecret = process.env.TOKEN_SECRET;
    /**Check for existing entry */
    let userAuthExists = await Auth.findOne({ email: email });
    /**Auth Found , update*/
    let updateAuthParam = {
      authToken: authToken,
      createdOn: Date.now(),
      tokenSecret: tokenSecret,
    };
    let query = { email: email };
    if (userAuthExists) {
      console.log("update token");
      let updatedAuth = await Auth.updateOne(query, updateAuthParam);
      saveTokenRes = updatedAuth
        ? Promise.resolve(tokenDetails)
        : Promise.reject(response(true, 500, "Token update error", null));
    } else {
      console.log("create token");
      let newAuthToken = new Auth({
        email: email,
        authToken: authToken,
        tokenSecret: tokenSecret,
      });
      let tokenSaved = await Auth.create(newAuthToken);
      saveTokenRes = tokenSaved
        ? Promise.resolve(tokenDetails)
        : Promise.reject(response(true, 500, "Token Save Error", null));
    }

    return saveTokenRes;
  };
  //login func start
  emailExistence()
    .then(credentialMatch)
    .then(getToken)
    .then(saveToken)
    .then((result) => {
      console.log(result);
      let api_res = result;
      let { authToken } = result;
      //delete api_res.authToken;
      res.header("authToken", authToken);
      res.status(200).json(response(false, 200, "Login Success", api_res));
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
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
  if (userExists) return res.json(response(true, 404, "User Exists", email));

  let hashed = await hashedPassword(password);
  //console.log("hashed", hashed);
  let newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashed,
  });
  //console.log(newUser);
  await User.create(newUser, (error, user) => {
    console.log("creating user");
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
      console.log("user created");
      return res
        .status(500)
        .json(response(true, 500, "Error Creating User", error.message));
    }
  });
};
exports.privateRouteTest = async (req, res) => {
  console.log("private router", req.email);
  res.send("pvt route");
};
exports.logout = async (req, res) => {
  console.log("logout routes", req.body);
  let { email } = req.body;
  //delete the auth details from auth-db
  let userExists = await User.findOne({ email: email });
  if (!userExists) return res.json(response(true, 400, "User Not Found", null));
  //delete the auth details
  let authExists = await User.findOne({ email: email });
  if (!authExists)
    return res.json(response(true, 400, "No Auth Details Found", null));
  /**delete entry*/
  let { n } = await Auth.deleteOne({ email: email });
  console.log("count,", n);
  if (n === 1) {
    console.log("Deleted auth");
    res.status(200).json(response(false, 200, "Logged out", null));
  } else {
    console.log("delete error");
    res.json(response(true, 500, "Logout Error", null));
  }
};
