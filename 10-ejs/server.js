const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('pages/index', {
        mensaje:'Hola ejs'
    })

})

app.listen(4000, (err) => {
    if (err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})