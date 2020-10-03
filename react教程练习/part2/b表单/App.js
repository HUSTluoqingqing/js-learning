import React, { useState } from 'react'

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

const Persons = ({personToshow}) => {
  return (
    <div>
      {personToshow.map((person) => 
        <p key={person.name}>{person.name}: {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const name = persons.map(person => person.name)
    if (name.indexOf(newName)===-1) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } 
    else
      alert(`${newName} is already added to phonebook`)
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
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToshow={personToshow}/>
    </div>
  )
}

export default App
