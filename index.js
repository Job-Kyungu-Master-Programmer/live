require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Model = require('./Model/Model')
//MiddleWare
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Body', request.body)
    console.log('Path', request.path)
    console.log('---')
    next();
}
app.use(requestLogger)

let courses = [
    {
        title: 'Developpement web',
        important: true,
        id: 1
    },
    {
        title: 'Cours Node js',
        important: true,
        id: 2
    },
    {
        title: 'La programmation Coloniale',
        important: true,
        id: 3
    },
]

app.get('/', (request, response) => {
    response.send('<h1> Node JS </h1>')
})

app.get('/api/courses', (request,response) => {
    Model.find({}).then(cours => {
        response.json(cours)
    })
})

app.get('/api/courses/:id', (request, response) => {
    Model.findById(request.params.id)
    .then(result => {
        response.json(result)
    })
})

app.delete('/api/courses/:id', (request,response) => {
    Model.findByIdAndDelete(request.params.id)
    .then(result => {
        response.json(result)
    })
})

app.post('/api/courses', (request, response) => {
    const body = request.body

    const course = new Model({
        title : body.title,
        important: body.important || false
    })

    course.save().then(savedCourse => {
         response.json(savedCourse)
    })
})

app.put('/api/courses/:id' , (request, response) => {
    const body = request.body

    const courseUpdate = {
        title: body.title,
        important: body.important
    }

    Model.findByIdAndUpdate(request.params.id, courseUpdate, {new: true}).then(result => {
         response.json(result)
    })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}  `)
})