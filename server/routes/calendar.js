const router = require("express").Router();
const {getCalendar, createEvent} = require("../controllers/calendar");

router.post("/", getCalendar);
router.post("/create-event", createEvent);

module.exports = router;
