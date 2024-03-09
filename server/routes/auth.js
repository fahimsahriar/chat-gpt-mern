const router = require("express").Router();
const {login, reset, register} = require("../controllers/auth");

router.post("/", login);
router.post("/register", register);
router.post("/reset", reset);

module.exports = router;
