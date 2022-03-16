const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')

const router = express.Router()

let jsonParser = bodyParser.json()

class ContenedorProductos {

    constructor(archivo){
        this.archivo = archivo
    }

    // Función para leer el archivo de productos
    readProductsFile(){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        return dataObj
    }

    // Función para escrbir el archivo de productos
    writeProductsFile(infoAEscribir){
        fs.writeFileSync(this.archivo,JSON.stringify(infoAEscribir,null,2))
    }
}

router.get('/', (req, res) => {
    let objects = []
    let contenedor1 = new ContenedorProductos("productos.txt")
    let datos = contenedor1.readProductsFile()

    for(let i in datos){
        objects.push(datos[i])
    }
    res.send(objects)
})

router.get('/:id', (req,res)=>{

    let productID = Number(req.params.id)
    let contenedor2 = new ContenedorProductos("productos.txt")
    let data = contenedor2.readProductsFile()

    for(let i in data){
        if(data[i].id === productID)
        res.send(data[i])
    }
})

router.post('/', jsonParser, (req,res)=>{
    let contenedor3 = new ContenedorProductos("productos.txt")
    let data = contenedor3.readProductsFile()
    let newId = Object.keys(data).length + 1

    let object = req.body
    object.timestamp = Date.now()
    object.id = newId
    data.push(object)
    contenedor3.writeProductsFile(data)
    res.send(data)
})

router.delete('/:id', (req,res)=>{
    let productID = Number(req.params.id)
    let contenedor4 = new ContenedorProductos("productos.txt")
    let data = contenedor4.readProductsFile()

    for(let i in data){
        if(data[i].id === productID)
        data.splice(i, 1)
    }
    res.send(data)
    contenedor4.writeProductsFile(data)
})

router.put('/:id', (req,res)=>{
    let productID = Number(req.params.id) -1
    let contenedor5 = new ContenedorProductos("productos.txt")
    let data = contenedor5.readProductsFile()

    data[productID].price = 200

    res.send(data)
    contenedor5.writeProductsFile(data)
})


module.exports = router