const socket = io.connect();
socket.on('mensajes', data => {
	console.log(data);
});

const renderer = data => {
	const html = data.map((elem, index) => {
		return (
			`<div>
				<strong>${elem.mail}</strong>:
				<em>${elem.mensaje}</em>
			</div>`)
	}).join(' ');
	document.querySelector('#mensajes').innerHTML = html;
};

const addMessage= (evt) => {
    const mail = document.querySelector('#mail').value
    const mensaje = document.querySelector('#mensaje').value

    const chat = {mail, mensaje}
    server.emit('mensaje-nuevo', chat, ()=>{
        console.log(chat)
    })
    return false
}

socket.on('mensajes', data => {
	renderer(data);
})