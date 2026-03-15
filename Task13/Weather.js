import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";

function Weather() {

  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);

  const API_KEY = "27f0c9b8464fa45d1e1e3e2e19e82f62";

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    setWeather(data);

  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (

    <div>

      <form onSubmit={handleSearch}>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button>Search</button>

      </form>

      {weather && (
  <div className="weather-box">

          <h2>{weather.name}</h2>

          <p>Temperature: {weather.main.temp} °C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Conditions: {weather.weather[0].description === "broken clouds"
    ? "Partly Cloudy"
    : weather.weather[0].description}
</p>

        </div>

      )}

      <Forecast city={city} />

    </div>

  );
}

export default Weather;