const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstack.leoei1o.mongodb.net/personApp?retryWrites=true&w=majority&appName=fullstack`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
        name: newName,
        number: newNumber
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })

} else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    console.log('too many arguments')
    process.exit(1)
}