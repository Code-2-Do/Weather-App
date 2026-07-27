import React,{ useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [wind, setWind] = useState(null);
  const [temp, setTemp] = useState(null);
  const [feel, setFeel] = useState(null);
  const [humidity, setHumid] = useState(null);
  const [city, setCity] = useState(`Bareilly`);
  const [weatherData, setWeatherData] = useState(null);

  const getdata = async () => {
    console.log("Getting Data...");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91fe2dab8e5cf48c886aed1ae34b98f7&units=metric`
    );
    
    const wind = response.data.wind;

    const body = document.querySelector("body")

    const weatherData = response.data.weather[0];

    setWeather(weatherData); // save to state

    setWeatherData(response.data);

    setWind(response.data.wind);

    setTemp(response.data.main.temp);

    setFeel(response.data.main.feels_like);

    setHumid(response.data.main.humidity);

    console.log(response.data);

    console.log(`Weather: ${weatherData.main} (${weatherData.description})`);
  };

  const checkDayOrNight = () => {
  if (!weatherData) return "";

  const { sunrise, sunset } = weatherData.sys;
  const currentTime = weatherData.dt;

  if (currentTime >= sunrise && currentTime <= sunset) {
    return "Day 🌞";   // daytime with sun emoji
  } else {
    return "Night 🌙"; // nighttime with moon emoji
  }
};
 
 const checkDay = () => {
  if (!weatherData) return "";

  const { sunrise, sunset } = weatherData.sys;
  const currentTime = weatherData.dt;

  if (currentTime >= sunrise && currentTime <= sunset) {
    return "🌞";   // daytime with sun emoji
  } else {
    return "🌙"; // nighttime with moon emoji
  }
};

  const getWeatherEmoji = (iconCode) => {
    switch (iconCode) {
      case "01d": return "☀️"; // clear sky day
      case "01n": return "🌙"; // clear sky night
      case "02d": return "🌤️"; // few clouds day
      case "02n": return "☁️🌙"; // few clouds night
      case "10d": return "🌧️"; // rain day
      case "10n": return "🌧️🌙"; // rain night
      case "13d": return "❄️"; // snow day
      case "13n": return "❄️🌙"; // snow night
      case "50d": return "🌫️"; // mist day
      case "50n": return "🌫️🌙"; // mist night
      default: return "🌍"; // fallback
    }
  };
  

  return (
    <div className="bruhhhhhhh">
      <div className="Navy">
        <Navbar className="Vadu"/>
      </div>
      <input className="text-5xl font-bold" type="text" placeholder="Search City" value={city} onChange={e => setCity(e.target.value)} />
      <button onClick={getdata} className="bg-white text-black">
        Get Weather
      </button>
      <div className="big-wrap">
        <div className="wrap">

          <div>
            <div className="flex justify-between">
              <p>
                {weather && (
                  <div>
                    <img className="relative top-[15px]"
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                    />
                  </div>
                )}
              </p>
              <p className="feel text-6xl">
                {feel !== null ? `${feel}°C` : ""}<br/>
                <p className="text-lg">Feels like:</p>
              </p>
            </div>
            <p className="relative top-[25px]">
              {weather
                ? `Weather: ${weather.main} (${weather.description})`
                : "No weather data yet"}
            </p>
            <p className="relative top-[25px]">
              {temp !== null ? `Temperature: ${temp}°C` : ""}
            </p>
            <p className="relative top-[25px]">
              {humidity !== null ? `Humidity: ${humidity}%` : ""}
            </p>
            {weatherData && (
            <div className="relative top-[25px]">
              <p>Time: {checkDayOrNight()}</p>
              <p>{weatherData.name}</p>
            </div>
            )}

          </div>
        </div>
        <div className="wrap">
          {weatherData && (
            <div>
              <p className="text-6xl flex">{weatherData.name}<p>{checkDay()}</p> .</p>
            </div>
          )}
          <p className="hmmmm">
            {wind !== null ? `Wind: ${wind.speed} m/s` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
