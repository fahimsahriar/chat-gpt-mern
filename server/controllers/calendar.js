const { google } = require('googleapis');
const { User} = require("../models/user");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
let REFRESH_TOKEN = "1//0gt7U_t7xFkJnCgYIARAAGBASNgF-L9IrzcJq74alasYJu8IybqgoxAJXvIMLp3MVBFXo1SSDH80rf_c1LgzOl_0obrpTWwRk1A";

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
);
const getCalendar = async (req, res) => {
	try {
        const {code} = req.body;
        const response = await oauth2Client.getToken(code);
        //console.log(response.tokens.refresh_token);
        REFRESH_TOKEN = response.tokens.refresh_token;
		res.status(201).send(response);
	} catch (error) {
		return res.status(500).send({ message: "Internal Server Error" });
	}
}
const createEvent = async (req, res) => {
	try {
        const { description, end, location, start, summary } = req.body;
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
        
        const calendar = google.calendar('v3');
        console.log("first");
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: { 
                description: description,
                end: {
                    dateTime: new Date(end.dateTime)
                }, 
                location: location, 
                start: {
                    dateTime: new Date(start.dateTime)
                }, 
                summary: summary,
                colorId: '7',
            }
        });
        
		res.status(201).send(response);
	} catch (error) {
		return res.status(500).send({ message: "Internal Server Error" });
	}
}

module.exports = {getCalendar, createEvent};