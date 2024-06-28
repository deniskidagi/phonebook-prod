const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

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
morgan.token('type', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.get('/api/persons', (request, response) => {
    response.json(contacts)

})

app.get('/info', (request, response) => {
    const contactsTotals = contacts.length
    response.send(`<p> phonebook has info for ${contactsTotals} people </br> ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contactDetail = contacts.find(contact => contact.id === id)
    if(!contactDetail){
        return response.status(400).json({
            error: "contact not found"
        })
    }
    response.json(contactDetail)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const validContacts = contacts.filter(contact => contact.id !== id)
    response.json(validContacts)
})

const generateId = () => {
    const MaxId = Math.max(...contacts.map(contact => Number(contact.id)))
    return MaxId + 1
}

app.post('/api/persons', (request, response) => {
    const contactBody = request.body
    if(!contactBody.name && !contactBody.number){
        return response.json({
            error: "name or number is missing"
        })
    }
    if(contacts.find(contact => contact.name === contactBody.name)){
        return response.json({
            error: "name must be unique"
        })
    }
    const contact = {
        id: generateId(),
        name: contactBody.name,
        number: contactBody.number
    }
    
    contacts = contacts.concat(contact)
    response.json(contact)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})