import { useState } from "react";

import CountryFilter from "./CountryFilter";
import {useCountry} from './hooks/index'

function App() {
  const [inputCountry, setInputCountry] = useState("");

  const handleInput = (event) => {
    setInputCountry(event.target.value);
  };

  const {filtered} = useCountry(inputCountry)
  const data = inputCountry !== '' ? filtered : []

  return (
    <>
      <label>Find Countries </label>
      <input type="text" value={inputCountry} onChange={handleInput} />
      { inputCountry && <CountryFilter data={data} />}
    </>
  );
}

export default App;
