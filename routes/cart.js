const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')

const router = express.Router()

let jsonParser = bodyParser.json()

class ContenedorCarrito {

    constructor(archivo){
        this.archivo = archivo
    }

    // Función para leer el archivo de carrito
    readCartFile(){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        return dataObj
    }

    // Función para escrbir el archivo de carrito
    writeCartFile(infoAEscribir){
        fs.writeFileSync(this.archivo,JSON.stringify(infoAEscribir,null,2))
    }
}

router.get('/:id/products', (req,res)=>{
    let wantedCartId = Number(req.params.id)
    let contenedor1 = new ContenedorCarrito("carrito.txt")
    let data = contenedor1.readCartFile()

    for(let i in data){
        if(data[i].cartId === wantedCartId){
            for(let x in data[wantedCartId-1].products){
                res.send(data[x].products)
            }
        }
    }
})

router.delete('/:id', (req,res)=>{
    let wantedCartId = Number(req.params.id)
    let contenedor2 = new ContenedorCarrito("carrito.txt")
    let data = contenedor2.readCartFile()

    for(let i in data){
        if(data[i].cartId === wantedCartId)
        data.splice(i, 1)
    }
    contenedor2.writeCartFile(data)
    res.send(data)
})

router.post('/:id/productos', jsonParser, (req,res)=>{
    let contenedor3 = new ContenedorCarrito("carrito.txt")
    let data = contenedor3.readCartFile()
    let cartToAddId = Number(req.params.id)

    let newProducts = req.body

    for(let i in data){
        if(data[i].cartId === cartToAddId)
        data[i].products.push(newProducts)
    }

    contenedor3.writeCartFile(data)
    res.send(data)
})

router.delete('/:id/productos/:id_prod', (req,res)=>{
    let wantedCartId = Number(req.params.id)
    let wantedProductId = Number(req.params.id_prod)
    let contenedor4 = new ContenedorCarrito("carrito.txt")
    let data = contenedor4.readCartFile()

    for(let i in data){
        if(data[i].cartId === wantedCartId){
            for(let x in data[i].products){
                if(data[i].products[x] === wantedProductId){
                    data[i].products.splice(x, 1)
                }
                
            }
        }
    }
    contenedor4.writeCartFile(data)
    res.send(data)
})

router.post('/', jsonParser ,(req,res)=>{
    let contenedor5 = new ContenedorCarrito("carrito.txt")
    let data = contenedor5.readCartFile()

    let newCart = req.body
    newCart.cartId = data.length + 1

    data.push(newCart)
    contenedor5.writeCartFile(data)
    res.send(data)
    console.log(`El id del nuevo carito es ${newCart.cartId}`);
})

module.exports = router