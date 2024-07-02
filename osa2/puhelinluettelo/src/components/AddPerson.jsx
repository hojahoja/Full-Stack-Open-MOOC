const AddPerson = ({ newName, handleInputField, handleAddition }) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputField} />
        </div>
        <div>
          <button onClick={handleAddition}>add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
