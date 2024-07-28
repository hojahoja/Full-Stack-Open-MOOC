import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.map((a) => (
        <Anecdote key={a.id} anecdote={a} handleClick={() => vote(a.id)} />
      ))}
    </div>
  );
};

export default AnecdoteList;
