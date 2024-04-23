import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
try {
  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: 'd8bf642955c9979b7a32c33ca78d19d0',
        units: 'imperial' 
            }
    }
  );
  setWeatherData(response.data);
  setLoading(false);
} catch (error) {
  console.error('Error fetching weather:', error);
  setLoading(false);
}

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            appid: 'd8bf642955c9979b7a32c33ca78d19d0',
            units: 'imperial' 
          }
        }
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  }, (error) => {
    console.error('Error getting user location:', error);
    setLoading(false);
  });
} else {
  console.error('Geolocation is not supported by this browser.');
  setLoading(false);
}

        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather', {
              params: {
                lat: latitude,
                lon: longitude,
                appid: 'd8bf642955c9979b7a32c33ca78d19d0',
                units: 'metric' // Specify 'metric' for Celsius
              }
            }
          );
          setWeatherData(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : weatherData ? (
        <div className="weather-card">
          <h2>Weather for {weatherData.name}</h2>
          <p className="weather-info">Temperature: <span>{weatherData.main.temp.toFixed(1)}°F</span></p> {/* Use toFixed(1) to round to 1 decimal place */}
          <p className="weather-info">Weather: <span>{weatherData.weather[0].main}</span></p>
          <p className="weather-info">Humidity: <span>{weatherData.main.humidity}%</span></p>
          <p className="weather-info">Wind Speed: <span>{weatherData.wind.speed} m/s</span></p>
          <p className="weather-info">Description: <span>{weatherData.weather[0].description}</span></p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherApp;