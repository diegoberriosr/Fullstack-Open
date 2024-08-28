const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}



const password = process.argv[2]

const url = `mongodb+srv://Copestack:${password}@cluster0.uoaug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


const getPeople = async () => {
    try{
        const response = await Person.find({})
        console.log('phonebook') 
        response.forEach(person => console.log(`${person.name} - ${person.number}`))
    } catch (e){
        console.log(e)
    }

    mongoose.connection.close()
}

const addPeople = async (name, number) => {
    const person = new Person({name:name, number:number})
    try{
        await person.save()
        console.log(`Added ${person.name} number ${number} to phonebook`)
        
    } catch(exception){ console.log(exception)}

    mongoose.connection.close()
}

if(process.argv.length === 5){
    addPeople(process.argv[3], process.argv[4])
}

if(process.argv.length === 3){
    getPeople()
}