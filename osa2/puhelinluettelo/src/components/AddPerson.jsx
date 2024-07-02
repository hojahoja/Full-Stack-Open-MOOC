const AddPerson = ({
  newName,
  newNumber,
  handleInputField,
  handleAddition,
}) => {
  return (
    <div>
      <form>
        <div>
          name:{" "}
          <input value={newName} name="newName" onChange={handleInputField} />
          <div>
            number:{" "}
            <input
              value={newNumber}
              name="newNumber"
              onChange={handleInputField}
            />
          </div>
        </div>
        <div>
          <button onClick={handleAddition}>add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
