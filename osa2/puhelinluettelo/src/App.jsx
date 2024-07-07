import { useEffect, useState } from "react";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";
import FilterField from "./components/FilterField";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputs, setInputs] = useState({
    newName: "",
    newNumber: "",
    newFilter: "",
  });
  const [statusMessage, setStatusMessage] = useState({
    message: null,
    isError: false,
  });
  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const showStatusMessage = (message, isError) => {
    setStatusMessage({ message, isError });
    setTimeout(() => {
      setStatusMessage({ message: null, isError: false });
    }, 3000);
  };

  const handleAddition = (event) => {
    event.preventDefault();

    const updateNumber = () => {
      // prettier-ignore
      if (confirm(`${inputs.newName} is already in the phonebook do you want to replace their number with the new one?`)) {
        const changedPerson = {...persons.find((p) => p.name === inputs.newName), number: inputs.newNumber};
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson));
          showStatusMessage(`Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`, false);
        }).catch(error => {
          showStatusMessage(`${changedPerson.name} has already been removed from the phonebook`, true)
          setPersons(persons.filter((n) => n.id !== changedPerson.id))
        });
      }
    };

    const addPerson = () => {
      const personObject = { name: inputs.newName, number: inputs.newNumber };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showStatusMessage(`Added ${returnedPerson.name}`, false);
      });
    };

    persons.some((p) => p.name === inputs.newName) ? updateNumber() : addPerson();
    setInputs((i) => ({ ...i, newName: "", newNumber: "" }));
  };

  //Took ideas on how to on how to handle multiple inputs from these:
  //Bro Code: https://www.youtube.com/watch?v=YxQlt3n1ZPA
  //Amit Sharma: https://medium.com/@amitsharma_24072/handling-multiple-inputs-in-reactjs-best-practices-for-react-js-input-forms-9b973f4beb7e
  const handleInputField = (event) => {
    const { name, value } = event.target;
    setInputs((i) => ({ ...i, [name]: value }));
  };

  const handleDeletion = (event, id, name) => {
    event.preventDefault();

    if (confirm(`Do you want to remove ${name} from the phonebook?`)) {
      personService
        .remove(id)
        .then((removedPerson) => {
          setPersons(persons.filter((p) => p.id !== id));
          showStatusMessage(`Removed ${name}`, false);
        })
        .catch((error) => {
          showStatusMessage(`${name} has already been removed from the phonebook`, true);
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage.message} isError={statusMessage.isError} />
      <FilterField newFilter={inputs.newFilter} handleInputField={handleInputField} />
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
            ? [
                ...arr,
                <Person
                  key={p.name}
                  name={p.name}
                  number={p.number}
                  handleDeletion={(e) => handleDeletion(e, p.id, p.name)}
                />,
              ]
            : arr;
        }, [])}
      </div>
    </div>
  );
};

export default App;
