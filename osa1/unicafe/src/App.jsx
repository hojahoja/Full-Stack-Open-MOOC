import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const StatisticLine = ({ name, value }) => (
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
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="average" value={average()} />
      <StatisticLine name="positive" value={percentageOfPositives() + " %"} />
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
