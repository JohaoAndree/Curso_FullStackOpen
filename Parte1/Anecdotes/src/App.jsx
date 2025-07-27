import { useState } from 'react'

const Text = ({ text }) => {
  return <p>{text}</p>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => 
    Object.fromEntries(anecdotes.map((_, index) => [index, 0]))
  )

  const handleVote = () => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [selected]: prevVotes[selected] + 1
    }))
  }

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const mostVotedIndex = Object.keys(votes).reduce((a, b) => 
    votes[a] > votes[b] ? a : b
  )

  return (
    <div>
      <h1>Anécdota del día</h1>
      <Text text={anecdotes[selected]} />
      <Text text={`Tiene ${votes[selected]} votos.`} />
      
      <Button onClick={handleVote} text="Votar" />
      <Button onClick={handleRandomAnecdote} text="Siguiente anécdota" />

      <h1>Anécdota con más votos</h1>
      <Text text={anecdotes[mostVotedIndex]} />
      <Text text={`Con ${votes[mostVotedIndex]} votos.`} />
    </div>
  )
}

export default App