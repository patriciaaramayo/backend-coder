const express = require('express')
const Contenedor = require('./contenedor')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //para que el formulario no llegue vacio
const arrayProducto = []
/////////////////////////////////////////////////

const { Router } = express
const routerProductos = Router()

routerProductos.get('/', (req, res) => {
    const contenedor = new Contenedor('./productos.txt')
    contenedor.getAll().then(response => {
        res.send(response)
    })
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    const contenedor = new Contenedor('./productos.txt')
    contenedor.getById(parseInt(id)).then(response => {
        res.send(response)
    })
})

routerProductos.post('/', (req, res) => {
    const objProducto = req.body
    const contenedor = new Contenedor('./productos.txt')
    contenedor.save(objProducto)
    res.json({
        msg: 'prod guardado',
        objProducto
    })
})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    const objProducto = req.body
    const contenedor = new Contenedor('./productos.txt')
    contenedor.updateById({ ...objProducto, id: parseInt(id) }).then(response => {
        res.send(response)
    })
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    const contenedor = new Contenedor('./productos.txt')
    contenedor.delete(parseInt(id)).then(response => {
        res.send(response)
    })
    res.json({
        msg: 'prod eliminado'
    })
})

////////////////////////////////////////////////
app.use('/api/productos', routerProductos)

app.listen(4000, (err) => {
    if (err) throw err
    console.log(`Escuchando en el puerto 4000`)
})