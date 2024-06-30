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

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const updateValue = (value) => {
    if (value === "good") {
      setGood(good + 1);
    } else if (value === "neutral") {
      setNeutral(neutral + 1);
    } else if (value === "bad") {
      setBad(bad + 1);
    } else {
      return;
    }
    setTotal(total + 1);
  };

  const average = () => (total ? (good - bad) / total : 0);
  const percentageOfPositives = () => (good ? (good / total) * 100 : 0);

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={() => updateValue("good")} text="good" />
        <Button handleClick={() => updateValue("neutral")} text="neutral" />
        <Button handleClick={() => updateValue("bad")} text="bad" />
      </div>
      <h2>Statistics</h2>
      <div>
        <Stat name="good" value={good} />
        <Stat name="neutral" value={neutral} />
        <Stat name="bad" value={bad} />
        <Stat name="average" value={average()} />
        <Stat name="positive" value={percentageOfPositives() + " %"} />
      </div>
    </div>
  );
};

export default App;
