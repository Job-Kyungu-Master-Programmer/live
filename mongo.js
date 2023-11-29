const mongoose = require('mongoose')
 if(process.argv.length <3) {
      console.log('Your password !')
      argv(1)
 }
 const password = process.argv[2]
 const url = 
 `mongodb+srv://joblodo97:jeancy@cluster0.xgmh1bb.mongodb.net/?retryWrites=true&w=majority`

 mongoose.set('strictQuery')
 mongoose.connect(url)

 const courseSchema = new mongoose.Schema({
    title : String,
    important: Boolean
 })
 const Cours = new mongoose.model('Cours', courseSchema)

 const course = new Cours({
    title: "Course de la physiologie mutuelle",
    important: true
 })

 course.save().then(result => {
     console.log('Bien envoyer')
     mongoose.connection.close()
 })