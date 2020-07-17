const router = require("express").Router();
const {
  loginControl,
  test,
  registerControl,
  privateRouteTest,
} = require("./controller");
const {
  registrationParamValidation,
  loginParamValidation,
  isAuthorized,
  authTokenParamValidation,
} = require("./middlewares");

router.get("/test", test);
router.get("/login", loginParamValidation, loginControl);
router.post("/register", registrationParamValidation, registerControl);
router.get(
  "/private",
  authTokenParamValidation,
  isAuthorized,
  privateRouteTest
);
module.exports = router;
