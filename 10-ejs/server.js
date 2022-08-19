const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => { 
    
    let productos = [
            {nombre:'Producto1',precio:'$100'},
            {nombre:'Producto2',precio:'$200'},
            {nombre:'Producto3',precio:'$300'},
            {nombre:'Producto4',precio:'$400'}
        ]
    res.render('pages/index', {
        mensaje:'Hola ejs',
        productos
    })

})

app.listen(4000, (err) => {
    if (err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})