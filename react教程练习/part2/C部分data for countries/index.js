import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import ReactDOM from 'react-dom'

const Filter = ({filter, handleFilterChange}) => {
  return (
      <div>
        find countries
        <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
  )
}

const Show = ({countryToshow, handleShowClick}) => {
  if (countryToshow.length > 10)
    return <p>Too many matches,specify another filter</p>
  else if (countryToshow.length === 1)
    return (
      <div>
        <h2>{countryToshow[0].name}</h2>
        <p>capital: {countryToshow[0].capital}</p>
        <p>population: {countryToshow[0].population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {countryToshow[0].languages.map(
            language => 
            <li key={language.name}>
              {language.name}
            </li>
          )}
        </ul>
        <img
        alt="flag"
        style={{maxWidth:100, height:'auto'}}
        src={countryToshow[0].flag} />
        <h3>Weather in {countryToshow[0].capital}</h3>
        <Weather capital={countryToshow[0].capital}/>
      </div>
    )
  else
    return (
      <div>
        {countryToshow.map(country => 
          <div key={country.name}>
            {country.name}
            <button onClick={handleShowClick} country={country.name}>show</button>
          </div>
        )}
      </div>
    )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState('')
  const hook = () => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=7664f50ad28e1a1e74381fd752121bd3&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
    })
  }
  useEffect(hook, [])
  console.log(weather)
  if ( ! weather ) {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <p><strong>temperature</strong> {weather.current.temperature} ℃<br />
      <img src={weather.current.weather_icons} alt={weather.current.weather_code}/></p>
      <p><strong>wind</strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}  </p>
    </div>		
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.type)
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleShowClick = (event) => {
    setFilter(event.target.attributes.country.value)
  }

  const countryToshow = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase())>-1)

  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)

  return <div>
    <Filter filter={filter} handleFilterChange={handleFilterChange} />
    <Show countryToshow={countryToshow} handleShowClick={handleShowClick} />
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
