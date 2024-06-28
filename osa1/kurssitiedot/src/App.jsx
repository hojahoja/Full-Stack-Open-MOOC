const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
const Content = (props) => {
  return (
    <>
      <div>
        <Part exercise={props.exercises[0]} part={props.parts[0]} />
        <Part exercise={props.exercises[1]} part={props.parts[1]} />
        <Part exercise={props.exercises[2]} part={props.parts[2]} />
      </div>
    </>
  );
};
const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises[0] + props.exercises[1] + props.exercises[2]}
    </p>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} parts={parts} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
