const router = require("express").Router();
const {
  loginControl,
  test,
  registerControl,
  privateRouteTest,
  logout,
} = require("./controller");
const {
  registrationParamValidation,
  loginParamValidation,
  logoutParamValidation,
  isAuthorized,
  authTokenParamValidation,
} = require("./middlewares");

router.get("/test", test);
router.post("/login", loginParamValidation, loginControl);
router.post("/register", registrationParamValidation, registerControl);
router.get(
  "/private",
  authTokenParamValidation,
  isAuthorized,
  privateRouteTest
);
router.delete("/logout", logoutParamValidation, logout);
module.exports = router;
