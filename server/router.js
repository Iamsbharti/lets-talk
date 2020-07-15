const router = require("express").Router();
const { loginControl, test, registerControl } = require("./controller");
const {
  registrationParamValidation,
  loginParamValidation,
} = require("./middlewares");

router.get("/test", test);
router.get("/login", loginParamValidation, loginControl);
router.post("/register", registrationParamValidation, registerControl);
module.exports = router;
