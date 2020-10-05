import React, { useState, useEffect } from 'react'
import phoneService from './services/phonebook'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Success = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
      <div>
        filter shown with
        <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({personToshow, deletePerson}) => {
  return (
    <div>
      {personToshow.map((person) => 
        <div key={person.name}>
          {person.name}: {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    phoneService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const name = persons.map(person => person.name)
    if (name.indexOf(newName)===-1) {
      phoneService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
        })
      setSuccessMessage(
        `Added ${newName}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      setNewName('')
      setNewNumber('')
    } 
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const id = person.id
        phoneService
          .update(person.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setSuccessMessage(
              `Update ${person.number} to ${newNumber}`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          console.log(response)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.type)
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.type)
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.type)
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personToshow = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase())>-1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Notification message={errorMessage} />
      <Success message={successMessage} />
      <h2 className='phonebook'>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToshow={personToshow} deletePerson={deletePerson} />
    </div>
  )
}

export default App

/*index.js*/
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
