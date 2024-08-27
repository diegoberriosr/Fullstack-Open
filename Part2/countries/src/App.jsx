import { useState, useEffect } from 'react'

// Component imports
import Searchbox from './components/Searchbox'
import Collection from './components/Collection.jsx'

// Service imports
import countriesService from './services/countries.js'

function App() {
  const [matches, setMatches] = useState([])
  const [displayed, setDisplayed] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
        const response = await countriesService.search('api/all')
        setMatches(response.data)
        setDisplayed(response.data)
    }

    fetchCountries()
  }, [])

  return (
    <>
    <Searchbox setMatches={setDisplayed} matches={matches}/>
    <Collection countries={displayed}/>
    </>
  )
}

export default App
