require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h2>The Phonebook</h2>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(contacts => {
        res.json(contacts.map(c => c.toJSON()))
    })

})

app.get('/info', (req, res) => {
    const ammount = persons.length
    res.send(`<p>The phonebook has info from ${ammount} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) response.json(person)
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body


    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(response => {
        console.log(`Added ${person.name}, number ${person.number} to the phonebook`);
        mongoose.connection.close();
    })

    persons = persons.concat(person)
    response.json(person)
})

