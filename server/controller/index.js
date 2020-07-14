exports.loginControl = async (req, res) => {
  console.log("login control control");
  res.send("login success");
};
exports.test = async (req, res) => {
  console.log("test route");
  res.send("test works");
};
exports.registerControl = async (req, res) => {
  console.log("register control");
  res.send("register works");
};
