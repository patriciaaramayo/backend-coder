const Contenedor = require("./contenedor");

const contenedor = new Contenedor('./prueba.txt')
contenedor.save({title:'Alysum2', price:'100', thumbnail:'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175__480.jpg'})
contenedor.getById(1)
contenedor.getAll()
//contenedor.delete(1)
//contenedor.deleteAll()