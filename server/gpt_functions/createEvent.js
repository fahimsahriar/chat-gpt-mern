const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
let REFRESH_TOKEN = "1//0gt7U_t7xFkJnCgYIARAAGBASNgF-L9IrzcJq74alasYJu8IybqgoxAJXvIMLp3MVBFXo1SSDH80rf_c1LgzOl_0obrpTWwRk1A";

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
);

const createEvent = async (event) => {
  try {
    console.log(event);
    return JSON.stringify({
      message: "Event created",
    });
  } catch (error) {
    // Handle errors
    console.error("Error to create event:", error.message);
    return { error: "Failed to create event" };
  }
};

module.exports = createEvent;