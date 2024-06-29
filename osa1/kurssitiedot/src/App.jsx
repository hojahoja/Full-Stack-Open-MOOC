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
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  const names = parts.map((p) => p.name);
  const exerciseCounts = parts.map((p) => p.exercises);

  return (
    <div>
      <Header course={course} />
      <Content exercises={exerciseCounts} parts={names} />
      <Total exercises={exerciseCounts} />
    </div>
  );
};

export default App;
