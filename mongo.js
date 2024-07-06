const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const password = encodeURIComponent("test@notes")
const url = `mongodb+srv://deniskidagi:${password}@cluster0.wjh3caa.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)


const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Phone = mongoose.model('Phone', phoneBookSchema)

const phone = new Phone({name: "kidagi", number: 795093820})

phone.save().then(result => {
    console.log("note saved");
    mongoose.connection.close()
})