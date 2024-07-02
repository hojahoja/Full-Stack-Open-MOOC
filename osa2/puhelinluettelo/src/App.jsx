import { useState } from "react";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";

const App = () => {
  const protoBook = [
    { name: "Arto Hellas", number: "044-7654321" },
    { name: "Robert Fripp", number: "+44-020-2133453" },
    { name: "Keith Emerson", number: "+44-020-1236542" },
    { name: "Neil Peart", number: "+1-310-2145831}" },
    { name: "Tosin Abasi", number: "+1-802-5324008" },
    { name: "Paavo Väyrynen", number: "040-1234567" },
  ];

  const [persons, setPersons] = useState(protoBook);
  const [inputs, setInputs] = useState({ newName: "", newNumber: "" });

  const handleAddition = (event) => {
    event.preventDefault();

    if (persons.some((p) => p.name === inputs.newName)) {
      alert(`${inputs.newName} is already in the phonebook`);
    } else {
      const personObject = { name: inputs.newName, number: inputs.newNumber };
      setPersons(persons.concat(personObject));
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
      <AddPerson
        persons={persons}
        handleInputField={handleInputField}
        handleAddition={handleAddition}
        newName={inputs.newName}
        newNumber={inputs.newNumber}
      />
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person key={p.name} name={p.name} number={p.number} />
      ))}
    </div>
  );
};

export default App;
