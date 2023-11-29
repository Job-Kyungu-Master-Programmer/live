const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('Connect to ', url)
mongoose.connect(url).then(result => {
     console.log('Connected to Mongodb')
}).catch(error => {
     console.log('failed connection')
})

const courseSchema = new mongoose.Schema({
    title : String,
    important: Boolean
})

courseSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id 
        delete object.__v
    }
})

module.exports = mongoose.model('Cours', courseSchema)