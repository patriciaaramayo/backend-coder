const express = require('express')
const Contenedor = require("./contenedor");

const app = express()
const contenedor = new Contenedor("./prueba.txt")

app.get('/productos', (req, res) => {
    contenedor.getAll().then(response => {
        res.send(response)
    })
})

app.get('/productoRandom', (req, res) => {
    contenedor.getAll().then(response => {
        let lista = JSON.parse(response)
        let item = lista[Math.floor(Math.random() * lista.length)];
        res.send(item)
    })
})

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos al servidor express</h1>`)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))