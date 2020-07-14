const router = require("express").Router();
const { loginControl, test } = require("./controller");

router.get("/test", test);
router.get("/login", loginControl);

module.exports = router;
