const express = require('express');
// const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const Phone = require('./models/phone')

let contacts =
[
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
// morgan.token('type', (req, res) => {
//     return JSON.stringify(req.body)
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
// app.get('/api/persons', (request, response) => {
//     response.json(contacts)

// })

app.get('/info', (request, response) => {
    const contactsTotals = contacts.length
    response.send(`<p> phonebook has info for ${contactsTotals} people </br> ${Date()}`)
})
app.get('/api/persons', (request, response) => {
    Phone.find({}).then(persons => response.json(persons))
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Phone.findById().then(response => response.json())
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const validContacts = contacts.filter(contact => contact.id !== id)
    response.json(validContacts)
})



app.post('/api/persons', (request, response) => {
    const contactBody = request.body
    if(contactBody === undefined){
        return response.status(400).json({error: "content is missing"})
    }
    const contact = new Phone({
        name: contactBody.name,
        number: contactBody.number
    })
    contact.save().then(savedContact => response.json(savedContact))
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})