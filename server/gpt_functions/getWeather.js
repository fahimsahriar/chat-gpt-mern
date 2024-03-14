const axios = require("axios");

const getCurrentWeather = async (city) => {
  try {
    // Make an API call to OpenWeatherMap
    const response = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city, // Example city name
          appid: process.env.OpenWeatherMap_API, // Your OpenWeatherMap API key
          units: "metric", // Units for temperature (metric for Celsius)
        },
      }
    );

    // Send the weather data in the response
    return JSON.stringify(response.data);
    // return JSON.stringify({
    //   fruit: "Apple",
    //   size: "Large",
    //   color: "Red",
    // });
  } catch (error) {
    // Handle errors
    console.error("Error fetching weather data:", error.message);
    return JSON.stringify({
      message: "An error occured."
    });
  }
};

module.exports = getCurrentWeather;
