import { useState, useEffect } from "react";
import Field from "./components/Field";
import CountryList from "./components/CountryList";
import countriesService from "./services/countriesService";
import Country from "./components/Country";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countriesData) => {
      setCountries(countriesData);
    });
  }, []);

  const handleFieldChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowButton = (event) => {
    setSearchTerm(event.target.name);
  };

  if (countries === null) return null;

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Field handleFieldChange={handleFieldChange} />
      <div>
        <CountryList
          handleShowButton={handleShowButton}
          list={
            filteredCountries.length < 11
              ? filteredCountries.map((c) => c.name.common)
              : null
          }
        />
      </div>
      <Country
        country={filteredCountries.length === 1 ? filteredCountries[0] : null}
      />
    </div>
  );
}

export default App;
