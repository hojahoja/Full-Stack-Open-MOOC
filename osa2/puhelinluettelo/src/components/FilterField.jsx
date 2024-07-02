const FilterField = ({ handleInputField }) => (
  <div>
    filter shown with <input name="newFilter" onChange={handleInputField} />
  </div>
);

export default FilterField;
