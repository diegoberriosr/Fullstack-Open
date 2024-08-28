import {useState, useEffect} from 'react'
import personService from './services/persons'


// Component imports
import Entry from './components/Entry'
import SuccessAlert from './components/SuccessAlert'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const filtering = filter.trim().length === 0 ? false : true // check if searching for specific strings

  const displayedContacts = filtering ? 
                            persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                            :
                            persons


  // Listeners
  const handleChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleSubmit = async (event) => {
    
    event.preventDefault()
    
    // Validate input
    if(newName.trim().length === 0 || newNumber.trim().length === 0) {
      
      alert('Name and number are mandatory!')
      setNewName('')
      setNewNumber('')
      return
    }

    if(persons.map(person => person.name).includes(newName)) {
      if(newNumber.trim().length !== 0){
        const person = persons.find(person => person.name === newName)
        if(confirm('Change their number?')){
          const response = await personService.update(person.id, {...person, number: newNumber})
          setPersons((prevPersons) => {
            let updatedPersons = [...prevPersons]
            const index = updatedPersons.findIndex(contact => contact.id === response.data.id)
            updatedPersons[index] = response.data
            return updatedPersons
          })
          setMessage('Contact was updated!')
        }
      } else {
        alert(`${newName} is already added to the phonebook`)
      }
      setNewName('')
      setNewNumber('')
      return
    }


    try{
    const res = await personService.create({name:newName, number:newNumber})
    if(res.status === 200) {setPersons(persons.concat({name: newName, number: newNumber}));     setMessage('new contact added!')}
    setNewName('') // clear input
    setNewNumber('')
    } catch(exception){ console.log(exception)}
  }


  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await personService.getAll()
        setPersons(response.data)        

      } catch(exception){ console.log(exception) }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if(message !== null) setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  return(
    <div>
      <h2>Phonebook</h2>
      <SuccessAlert message={message}/>
      <div>
        <p>filter shown with <input value={filter} onChange={handleFilterChange}/></p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {displayedContacts.map(person => <Entry key={person.name} person={person} setPersons={setPersons} setMessage={setMessage}/>)}
      </ul>
    </div>
  )
}

export default App