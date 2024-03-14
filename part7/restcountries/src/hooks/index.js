import {useState, useEffect} from 'react'
import axios from "axios";

export const useCountry = (inputCountry) => {
  const [countryData, setCountryData] = useState([]);
  const basicURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  useEffect(() => {
    axios.get(basicURL).then((res) => {
        setCountryData(res.data);
    });
  }, []);
  const filtercountry = countryData.filter((country) => country.name.common.toLowerCase().includes(inputCountry))
  const filtered = filtercountry.length === 0 ? "No Data Found..." : filtercountry;

  return {
    filtered
  }
}