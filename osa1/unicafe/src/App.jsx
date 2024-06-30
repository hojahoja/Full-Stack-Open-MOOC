import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const Stat = ({ name, value }) => (
  <>
    {name} {value} <br />
  </>
);

const Statistics = (props) => {
  const [good, neutral, bad] = props.values;
  const total = good + neutral + bad;

  if (total === 0) return <div>No feedback given</div>;

  const average = () => (good - bad) / total;
  const percentageOfPositives = () => (good / total) * 100;

  return (
    <div>
      <Stat name="good" value={good} />
      <Stat name="neutral" value={neutral} />
      <Stat name="bad" value={bad} />
      <Stat name="average" value={average()} />
      <Stat name="positive" value={percentageOfPositives() + " %"} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h2>Statistics</h2>
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

export default App;
