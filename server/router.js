const router = require("express").Router();
const { loginControl, test, registerControl } = require("./controller");
const { paramValidation } = require("./middlewares");

router.get("/test", test);
router.get("/login", loginControl);
router.post("/register", paramValidation, registerControl);
module.exports = router;
