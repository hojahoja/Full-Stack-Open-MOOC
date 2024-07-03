const Person = ({ name, number, handleDeletion }) => (
  <>
    {name} {number} <button onClick={handleDeletion}>delete</button>
    <br />
  </>
);

export default Person;
