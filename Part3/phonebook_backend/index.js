const express = require('express')
const morgan = require('morgan')
const cors = require('cors'

)
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.use(cors())
app.use(express.static('dist'))
let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => Math.round(Math.random() * 1000000) // ids up to one million

app.get('/api/persons', (request, response) => {
    response.send(people)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body || !body.name || !body.name){
        return response.status(400).send({
            error: 'empty request body'
        })
    }

    if(body.name.trim().legnth === 0 || body.number.trim() === 0){
        return response.status(400).send({
            error: 'name and number may not be empty!'
        })
    }

    if(people.map(p => p.name).includes(body.name)) return response.status(400).send({
        error: 'Names must be unique!'
    })


    const person = {
        id : generateId(),
        name: body.name,
        number: body.number
    }

    people = people.concat(person)
    response.send(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = people.find(p => p.id === id)

    if(person){
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    people = people.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${people.length} people</p>
        <p>${new Date().toTimeString()}</p>
        `
    )
})


const PORT = process.env.PORT ||  3001

app.listen(PORT, () => {
    console.log(`APP RUNNING ON PORT ${PORT}`)
})

