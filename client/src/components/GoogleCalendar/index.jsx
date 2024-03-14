import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { useCallback, useState } from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function CalenderComponent() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    // Making the POST request using Axios
    axios
      .post("http://localhost:8080/api/calendar", { code })
      .then((response) => {
        console.log("Response:", response.data);
        // Handle the response data here
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };
  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    flow: "auth-code",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Construct event object
    const eventObject = {
      summary,
      location,
      description,
      start: { dateTime: startTime },
      end: { dateTime: endTime },
    };

    try {
      // Make POST request to Google Calendar API to create event
      const response = await axios.post('http://localhost:8080/api/calendar/create-event', eventObject);

      console.log("Event created:", response.data);

      // Clear form after successful submission
      setSummary("");
      setLocation("");
      setDescription("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  return (
    <div className={styles.container}>
      {!loggedIn ? (
        <div className={styles.buttonContainer}>
          <div className={styles.header}>
            <h1>Google Calendar</h1>
          </div>
          <button onClick={() => login()} className={styles.loginButton}>
            Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <label>
            Summary:
            <input
              type='text'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            Location:
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            Description:
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            Start Time:
            <input
              type='datetime-local'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            End Time:
            <input
              type='datetime-local'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type='submit' className={styles.submitButton}>
            Create Event
          </button>
        </form>
      )}
    </div>
  );
}

export default CalenderComponent;
