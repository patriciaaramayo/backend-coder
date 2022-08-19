const server = io().connect()

const render = (productos) => {
    let listado = document.querySelector('#listado')
    let html = productos.map(prod => {
        return `<li>
            <strong>Nombre: ${prod.nombre}</strong>
            <em>Precio: ${prod.precio}</em>
            <img src="${prod.foto}">
        </li>`
    })
    listado.innerHTML = html.join(' ')
}

const addProduct= (evt) => {
    const nombre = document.querySelector('#nombre').value
    const precio = document.querySelector('#precio').value
    const foto = document.querySelector('#foto').value

    const producto = {nombre, precio, foto}
    server.emit('producto-nuevo', producto, (id)=>{
        console.log(id)
    })
    return false
}

server.on('mensaje-servidor', mensaje => {
    render(mensaje.productos)
})



