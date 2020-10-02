import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({good,neutral,bad,allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  const ave = (good-bad)/(good+bad+neutral)
  let strave = Number(ave).toFixed(2)
  const positive = (good)/(good+bad+neutral)
  let str=Number(positive*100).toFixed(2)
  str+="%";
  return (
    <div>
      <h2>{'statistics'}</h2>
      <p>{'good'} {good}</p>
      <p>{'neutral'} {neutral}</p>
      <p>{'bad'} {bad}</p>
      <p>{'all'} {good+bad+neutral}</p>
      <p>{'average'} {strave}</p>
      <p>{'positive'} {str}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({header}) => {
  return (
    <h2>{header}</h2>
  )
}

const App = (props) => {
  const header = 'give feedback'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={header}/>
      <div>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
      </div>
      <Display good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}
ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
