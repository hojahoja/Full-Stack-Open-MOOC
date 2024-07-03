import { useEffect, useState } from "react";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";
import FilterField from "./components/FilterField";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputs, setInputs] = useState({
    newName: "",
    newNumber: "",
    newFilter: "",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleAddition = (event) => {
    event.preventDefault();

    if (persons.some((p) => p.name === inputs.newName)) {
      alert(`${inputs.newName} is already in the phonebook`);
    } else {
      const personObject = { name: inputs.newName, number: inputs.newNumber };
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }
    setInputs((i) => ({ ...i, newName: "", newNumber: "" }));
  };

  //Took ideas on how to on how to handle multiple inputs from these:
  //Bro Code: https://www.youtube.com/watch?v=YxQlt3n1ZPA
  //Amit Sharma: https://medium.com/@amitsharma_24072/handling-multiple-inputs-in-reactjs-best-practices-for-react-js-input-forms-9b973f4beb7e
  const handleInputField = (event) => {
    const { name, value } = event.target;
    setInputs((i) => ({ ...i, [name]: value }));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField
        newFilter={inputs.newFilter}
        handleInputField={handleInputField}
      />
      <h2>add a new</h2>
      <AddPerson
        persons={persons}
        handleInputField={handleInputField}
        handleAddition={handleAddition}
        newName={inputs.newName}
        newNumber={inputs.newNumber}
      />
      <h2>Numbers</h2>
      <div>
        {persons.reduce((arr, p) => {
          return p.name.toLowerCase().includes(inputs.newFilter.toLowerCase())
            ? [...arr, <Person key={p.name} name={p.name} number={p.number} />]
            : arr;
        }, [])}
      </div>
    </div>
  );
};

export default App;
