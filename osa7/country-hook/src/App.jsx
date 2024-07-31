import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
  const fetchCountryData = async () => (await axios.get(`${baseUrl}/${name}`)).data;
  const parseCountry = (rawData) => {
    const countryData = {
      found: true,
      data: {
        name: rawData.name.common,
        capital: rawData.capital[0],
        population: rawData.population,
        flag: rawData.flags.png,
      },
    };
    return countryData;
  };

  useEffect(() => {
    if (name) {
      (async () => {
        try {
          const data = await fetchCountryData();
          setCountry(parseCountry(data));
        } catch (error) {
          if (error.response.data.error === "not found") {
            setCountry({ country: null, found: false });
          } else {
            throw error;
          }
        }
      })();
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height="100" alt={`flag of ${country.data.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
