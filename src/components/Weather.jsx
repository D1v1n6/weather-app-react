import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
    "02n": clear_icon,
    "03d": clear_icon,
    "03n": clear_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        location: data.name,
        temperature: Math.floor(data.main.temp),
        icon: icon,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather--app">
      <div className="menu">
        <input
          type="text"
          className="cityname"
          placeholder="Enter a city ..."
          ref={inputRef}
        />
        <button
          className="search"
          onClick={() => search(inputRef.current.value)}
        >
          <img src={search_icon} alt="" />
        </button>
      </div>
      <img src={weatherData.icon} alt="" className="weather--icon" />
      <h1>{weatherData.temperature}°C</h1>
      <p className="location">{weatherData.location}</p>
      <div className="other--info">
        <div>
          <img src={humidity_icon} alt="" />
          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
        <div>
          <img src={wind_icon} alt="" />
          <p>{weatherData.windspeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
