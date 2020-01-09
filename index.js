require('dotenv').config() //for environment variables
const Person = require('./models/person')
const express = require('express') //web framework
const morgan = require('morgan') //HTTP request logger
const cors = require('cors') //manage (allow) cross-origin resource sharing

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

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(contacts => response.json(contacts.map(c => c.toJSON())))
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const ammount = persons.length
    res.send(`<p>The phonebook has info from ${ammount} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.findById(request.params.id)
        .then(person => {
            if (person) response.json(person)
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => response.json(savedPerson.toJSON()))
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)