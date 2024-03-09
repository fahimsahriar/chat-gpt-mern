const axios = require('axios');

const getCurrentWeather = async (req, res) => {
  try {
    // Make an API call to OpenWeatherMap
    const response = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: "New York", // Example city name
          appid: process.env.OpenWeatherMap_API, // Your OpenWeatherMap API key
          units: "metric", // Units for temperature (metric for Celsius)
        },
      }
    );

    // Send the weather data in the response
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = getCurrentWeather;
