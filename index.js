const express = require('express')
const app = express()
const cors = require('cors')
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
    response.json(courses)
})

app.get('/api/courses/:id', (request,response) => {
    const courseId = Number(request.params.id)
    const course = courses.find(course => course.id == courseId)
    response.json(course)
})

app.delete('/api/courses/:id', (request,response) => {
    const courseId = Number(request.params.id)
    const course   = courses.filter(course => course.id !== courseId)
    response.json(course)
})

const generate = () => {
    const genMax = courses.length > 0 ?
    Math.random(...courses.map(c => c.id)) : 0
    return genMax + 1
}

app.post('/api/courses', (request,response) => {
    const body = request.body

    const course = {
        title: body.title,
        important: body.important || false,
        id: generate()
    }

    courses = courses.concat(course)
    response.json(course)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}  `)
})