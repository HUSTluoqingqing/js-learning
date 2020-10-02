import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <h1>{props.header}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const [select, setSelect] = useState(0)
  const [points, setPoints] = useState(() => Array(props.anecdotes.length).fill(0))
  const [most, setMost] = useState(0)
  const copy = [...points]
  const Nextrandom = () => {
    setSelect(Math.floor(Math.random()*props.anecdotes.length))
  }

  const Vote = () => {
    copy[select] += 1
    setPoints(copy)
    setMost(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <Header header='Anecdote of the day'/>
      <p>{props.anecdotes[select]}</p>
      <p>has {points[select]} votes</p>
      <Button handleClick={Vote} text='vote' />
      <Button handleClick={Nextrandom} text='next anecdote' />
      <Header header='Anecdote with most votes'/>
      <p>{props.anecdotes[most]}</p>
      <p>has {points[most]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
