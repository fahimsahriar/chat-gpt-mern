const router = require("express").Router();
const prompt = require("../controllers/prompt");

router.get("/", prompt);

module.exports = router;
