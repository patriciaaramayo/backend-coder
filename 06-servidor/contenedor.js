const fs = require('fs')

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8');
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length){
                await fs.promises.writeFile(this.ruta,JSON.stringify([...dataArchParse, {...obj, id: dataArchParse[dataArchParse.length - 1].id + 1}],null,2))
                console.log(`El producto tiene el id: ${dataArchParse[dataArchParse.length - 1 ].id + 1}`)
            }
            else{
                await fs.promises.writeFile(this.ruta,JSON.stringify([{...obj, id: 1}],null,2))
                console.log(`El producto tiene el id : 1`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //traer producto por id
    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto){
                return producto
                //console.log(producto)
            }
            else{
                return null
                //console.log('No se encontró el producto')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){
                return dataArch//Parse
               // console.log(dataArchParse)
            } else {
                //console.log('No hay productos')
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    //eliminar producto por id
    async delete(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchParseFiltrado = dataArchParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log('Producto eliminado')
            } else {
                console.log('No se encontró el producto')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    //eliminar todos
    async deleteAll(){
       try {
        let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchParse = JSON.parse(dataArch)
        if(dataArchParse.length){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], 'utf-8'))
        } else {
            console.log('No hay productos')
        }
    } catch (error) {
        console.log(error)
    }
    }

}

module.exports = Contenedor