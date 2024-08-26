import personService from '../services/persons'

const Entry = ({person, setPersons, setMessage}) => {
    const handleDelete = async () => {
        if(window.confirm('Are you sure?')){
            try{
                await personService.deleteResource(person.id)
                setPersons((prevPersons) => prevPersons.filter(contact => contact.id !== person.id))
                setMessage('contact deleted!')
            } catch(e){ 
                setMessage('this contact has already been deleted!')
                console.log(e)}
        }
    }
    return(
        <li>
            <span>{person.name}: {person.number}</span>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Entry