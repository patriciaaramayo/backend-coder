const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        mensaje:'Hola pug'
    })

})

app.listen(4000, (err) => {
    if (err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})