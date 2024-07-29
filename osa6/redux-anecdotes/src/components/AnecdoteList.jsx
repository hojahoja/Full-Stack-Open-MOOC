import { useSelector, useDispatch } from "react-redux";
import { showNotification, hideNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useEffect } from "react";

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
  const dispatch = useDispatch();
  const notification = useSelector(({ notification }) => notification);
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );
  });

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      dispatch(hideNotification());
    }, "5000");
    return () => clearTimeout(timeoutID);
  }, [dispatch, notification]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(showNotification(`you voted "${anecdote.content}"`));
  };

  return (
    <div>
      {anecdotes.map((a) => (
        <Anecdote key={a.id} anecdote={a} handleClick={() => vote(a)} />
      ))}
    </div>
  );
};

export default AnecdoteList;
