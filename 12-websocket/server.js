const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT || 4000
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})


let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 , foto: 'https://cdn4.iconfinder.com/data/icons/basic-ingredients/512/tea-128.png'},
    { id: 2, nombre: 'Producto 2', precio: 200 , foto: 'https://cdn4.iconfinder.com/data/icons/basic-ingredients/512/honey-128.png'},
    { id: 3, nombre: 'Producto 3', precio: 300 , foto: 'https://cdn4.iconfinder.com/data/icons/basic-ingredients/512/salt-pepper-128.png'}
]

const mensajes = [
	{ mail: 'jose@mail.com', mensaje: 'Hola' , hora:'19/8/2022, 11:11:43'},
	{ mail: 'pedro@mail.com', mensaje: 'Chau' , hora:'19/8/2022, 09:11:43'},
	{ mail: 'ana@mail.com', mensaje: 'Buenas tardes' , hora:'19/8/2022, 08:11:43'},
]

io.on('connection', (socket) => {
    const mensaje = {
        mensaje: 'ok',
        productos
    }   
    socket.emit('mensaje-servidor', mensaje)
    
    socket.on('producto-nuevo', async (producto, cb) => {
        productos.push(producto)
        const mensaje = {
            mensaje: 'producto insertado',
            productos
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', mensaje )
        cb(id)
    })
    socket.emit('mensajes', mensajes);
    socket.on('mensaje-nuevo', data => {
		mensajes.push(data);
        console.log(data);
		io.sockets.emit('mensajes', mensajes);
	})

})

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})