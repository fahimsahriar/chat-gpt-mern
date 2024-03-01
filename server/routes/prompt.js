const router = require("express").Router();
const prompt = require("../controllers/prompt");

router.post("/", prompt);

module.exports = router;
