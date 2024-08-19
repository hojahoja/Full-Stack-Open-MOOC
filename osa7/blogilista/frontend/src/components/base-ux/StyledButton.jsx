const StyledButton = ({ className = "", color = "blue", onClick, children }) => {
  const blueButton = `rounded-lg bg-blue-400 px-2 py-1 font-semibold text-white
    shadow-md ring-1 hover:bg-blue-500 active:bg-blue-600 active:shadow-inner`;

  const whiteButton = `rounded-lg bg-white px-2 py-1 font-semibold shadow-md ring-1
    hover:bg-gray-50 active:bg-gray-100 active:shadow-inner`;

  return (
    <button
      className={color === "white" ? `${className} ${whiteButton}` : `${className} ${blueButton}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default StyledButton;
