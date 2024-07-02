import { useState } from "react";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Robert Fripp" },
    { name: "Keith Emerson" },
    { name: "Neil Peart" },
    { name: "Tosin Abasi" },
  ]);
  const [newName, setNewName] = useState("");

  const handleAddition = (event) => {
    event.preventDefault();

    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
    } else {
      const personObject = { name: newName };
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };
  const handleInputField = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPerson
        persons={persons}
        handleInputField={handleInputField}
        handleAddition={handleAddition}
        newName={newName}
      />
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person key={p.name} name={p.name} />
      ))}
    </div>
  );
};

export default App;
