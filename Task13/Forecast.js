import React, { useState, useEffect } from "react";

function Forecast({ city }) {

  const [forecast, setForecast] = useState([]);

  const API_KEY = "27f0c9b8464fa45d1e1e3e2e19e82f62";

  useEffect(() => {

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {

        if (data.list) {
          setForecast(data.list.slice(0, 5));
        }

      });

  }, [city]);

  return (

 <div className="forecast-container">

      <h3>5 Day Forecast</h3>

      {forecast.map((item, index) => (

       <div key={index} className="forecast-item">

          <p>{item.main.temp} °C</p>

          <p>{item.weather[0].description}</p>

        </div>

      ))}

    </div>

  );
}

export default Forecast;