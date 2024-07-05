const Country = ({ country }) => {
  if (country === null) return null;

  const languages = Object.values(country.languages).map((l) => (
    <li key={l}>{l}</li>
  ));

  return (
    <div>
      <h1> {country.name.common} </h1>
      <p>
        capital {country.capital[0]} <br /> area {country.area}
      </p>
      <h3>languages: </h3>
      <ul>{languages}</ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Country;
