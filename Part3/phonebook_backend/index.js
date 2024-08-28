const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')


const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.use(cors())
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.get('/api/persons', async (request, response) => {
    
    try{
        const people = await Person.find({})
        response.json(people)
    } catch(exception) {console.log(exception)}


})

app.post('/api/persons', async (request, response, next) => {
    const body = request.body
    const people = await Person.find({})

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


    const person = new Person({
        name: body.name,
        number: body.number
    })

    try{
        const newPerson = await person.save()
        response.json(newPerson)
    } catch(exception){
        next(exception)
    }
})

app.get('/api/persons/:id', async (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if(person) response.json(person)
            else response.status(404).end()
        })
        .catch( error => next(error))
})

app.delete('/api/persons/:id', async (request, response) => {
    const id = request.params.id
    await Person.findByIdAndDelete(id)
    response.status(204).end()
})

app.put('/api/persons/:id', async (request, response, next) => {
    const id = request.params.id
    const person = {
        number: request.body.number
    }

    try{
        const updatedPerson = await Person.findByIdAndUpdate(
            id, 
            person, {new: true},
            { new: true, runValidators: true, context: 'query' })   
        response.json(updatedPerson)
    } catch (exception){
        next(exception)
    }
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${people.length} people</p>
        <p>${new Date().toTimeString()}</p>
        `
    )
})

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`APP RUNNING ON PORT ${PORT}`)
})

