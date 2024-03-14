import React, { useEffect, useState } from "react";
import axios from "axios";

const Weatherdata = ({ city }) => {
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  useEffect(() => {
    fetchweatherdata();
  }, []);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  async function fetchweatherdata() {
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/${city}`,
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await axios(options);
      setIcon(response.data.weather[0].icon);
      setTemp(response.data.main.temp);
      setWind(response.data.wind.speed);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h2>Weather in {city}</h2>
      {temp && <p>temperature {temp} Celcius</p>}
      {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />}
      {wind && <p>wind {wind} m/s</p>}
    </>
  );
};

export default Weatherdata;
