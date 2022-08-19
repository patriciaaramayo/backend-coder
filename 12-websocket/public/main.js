const socket = io.connect();
socket.on('mensajes', data => {
	console.log(data);
});

const renderer = data => {
	const html = data.map((elem, index) => {
		return (
			`<div>
				<strong>${elem.mail }</strong>
				<strong>${ elem.hora}</strong>:
				<em>${ elem.mensaje}</em>
				
			</div>`)
	}).join(' ');
	document.querySelector('#mensajes').innerHTML = html;
};

const addMessage= (evt) => {
    const mail = document.querySelector('#mail').value
    const mensaje = document.querySelector('#mensaje').value
	const hora = new Date(Date.now()).toLocaleString()
    const chat = {mail, mensaje, hora}
    server.emit('mensaje-nuevo', chat, ()=>{
        console.log(chat)
    })
    return false
}

socket.on('mensajes', data => {
	renderer(data);
})