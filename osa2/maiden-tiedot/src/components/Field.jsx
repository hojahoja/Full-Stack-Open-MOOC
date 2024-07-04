const Field = ({ handleFieldChange }) => {
  return (
    <div>
      find countries <input name="filter" onChange={handleFieldChange} />
    </div>
  );
};

export default Field;
