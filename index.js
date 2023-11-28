const express = require('express')
const app = express()

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

app.use('/', (request, response) => {
    response.send('<h1> Node JS </h1>')
})


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}  `)
})