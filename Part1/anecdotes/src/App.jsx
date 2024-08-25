import { useState } from 'react'

const Anecdote = ({anecdote}) => {
  return(
    <p>
    {anecdote.quote}
    <br/>
    <strong>{anecdote.votes} vote(s)</strong>
  </p>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      quote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      quote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      quote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      quote: 'The only way to go fast, is to go well.',
      votes: 0
    }
    
  ])
  
  const randomIndex = () => Math.round(Math.random() * anecdotes.length-1)

  const [selected, setSelected] = useState(randomIndex())

  const handleVote = () => {
    setAnecdotes((prevAnecdotes) => {
      let newAnecdotes = [...prevAnecdotes]
      newAnecdotes[selected].votes++
      console.log(newAnecdotes)
      return newAnecdotes
    })
  }

  // not very efficient
  const mostVoted = [...anecdotes].sort((a,b) => b.votes - a.votes)[0]



  return (
    <>
      <h1>Anectode of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <div>
        <button onClick={() => setSelected(randomIndex())}>Random</button>
        <button onClick={handleVote}>Vote</button>
      </div>
      <h1>Most votes:</h1>
      <Anecdote anecdote={mostVoted}/>
    </> 
  )
}

export default App