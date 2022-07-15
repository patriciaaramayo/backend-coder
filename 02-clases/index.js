class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

	countMascotas(){
        return this.mascotas.length;
    }
	
	addBook(nombre, autor){
        this.libros.push({'nombre': nombre, 'autor': autor})
    }
	
	getBooksNames(){    
        return this.libros.map((libro) => libro.nombre);
    }

}

let usuario = new Usuario("Jose", "Perez",[{'nombre': "Don Quijote de la Mancha", 'autor':"Miguel de Cervantes"}], ["perro"]);
console.log(usuario.getFullName());
usuario.addBook("El Aleph", "Jorge Luis Borges");
usuario.addMascota("gato");
console.log(usuario.getBooksNames());
console.log(usuario.countMascotas());