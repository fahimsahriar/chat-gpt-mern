const router = require("express").Router();
const getCurrentWeather = require("../controllers/weather");

router.post("/", getCurrentWeather);

module.exports = router;
