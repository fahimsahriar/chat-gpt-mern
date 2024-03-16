const router = require("express").Router();
const {getGoogleAccess, createEvent} = require("../controllers/calendar");

router.post("/", getGoogleAccess);
router.post("/create-event", createEvent);

module.exports = router;
