import React from 'react'

const ShowCountry = ({data}) => {
  const langs = Object.values(data.languages);
  return (
    <div>
      <h1>{data.name.common}</h1>
        <p>capital {data.capital}</p>
        <p>area {data.area}</p>
        <h4>languages:</h4>
        {langs.map((lang) => {
          return (
            <li key={lang} style={{ margin: "0 0 10px 25px " }}>
              {lang}
            </li>
          );
        })}
        <img
          height={"150"}
          width={"150"}
          src={data.flags.png}
          alt={data.flags.alt}
        /> 
    </div>
  )
}

export default ShowCountry