const fs = require('fs')

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    async #readFileFuncion(ruta) {
        let archivo = await fs.promises.readFile(ruta, 'utf-8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async save(obj) {
        try {
            let dataArchParse = await this.#readFileFuncion(this.ruta)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 }], null, 2))
                console.log(`El producto tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
            }
            else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1 }], null, 2))
                console.log(`El producto tiene el id : 1`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //traer producto por id
    async getById(id) {
        try {
            let dataArchParse = await this.#readFileFuncion(this.ruta)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                return producto
            }
            else {
                return { error: 'no existe el producto' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let dataArchParse = await this.#readFileFuncion(this.ruta)
            if (dataArchParse.length) {
                return dataArchParse
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    //eliminar producto por id
    async delete(id) {
        try {
            let dataArchParse = await this.#readFileFuncion(this.ruta)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchParseFiltrado = dataArchParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log('Producto eliminado')
            } else {
                return { error: 'no existe el producto' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //eliminar todos
    async deleteAll() {
        try {
            let dataArchParse = await this.#readFileFuncion(this.ruta)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([], 'utf-8'))
            } else {
                console.log('No hay productos')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(obj) {
        try {
            let dataArch = await this.#readFileFuncion(this.ruta)
            const objIndex = dataArch.findIndex(prod => prod.id === obj.id) //devuelve -1 o la posicion del objeto
            if (objIndex !== -1) {
                dataArch[objIndex] = obj //actualiza el array en la posicion objIndex con el nuevo objeto
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArch, null, 2))
                return { msg: 'actualizado el producto' }
            } else {
                return { error: 'no existe el producto' }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor