import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, updateAnecdote } from "../requests";
import NotificationContext from "./contexts/NotificationContext";
import { useContext, useEffect } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  /* If you don't clear the timer on each new mount of Notification component
  then the previous timeout function will clear notifications prematurely 
  This method renders the page again needlessly after notification is set to null :/ */
  useEffect(() => {
    const timerId = setTimeout(() => {
      notificationDispatch({ type: "HIDE" });
    }, 5000);
    return () => clearTimeout(timerId);
  }, [notification, notificationDispatch]);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (changedAnecdote) => {
      let anecdotes = queryClient.getQueryData(["anecdotes"]);
      anecdotes = anecdotes.map((a) => (a.id !== changedAnecdote.id ? a : changedAnecdote));
      queryClient.setQueryData(["anecdotes"], anecdotes);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "SHOW", payload: `you voted: ${anecdote.content}` });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
