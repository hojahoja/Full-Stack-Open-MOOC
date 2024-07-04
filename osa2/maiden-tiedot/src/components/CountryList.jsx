const LimitedList = ({ list, handleShowButton }) => {
  if (list === null) return <>Too many matches, specify another filter</>;
  if (list.length === 1) return null;

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  const listElements = list.map((e) => (
    <li key={e}>
      {e}
      <button name={e} onClick={handleShowButton}>
        show
      </button>
    </li>
  ));
  return <ul style={listStyle}>{listElements}</ul>;
};

export default LimitedList;
