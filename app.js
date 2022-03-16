const fs = require('fs')
const express = require('express')

const productsRouter = require("./routes/products")
const cartsRouter = require("./routes/cart")

const app = express()

let admin = false

app.use(express.json())
app.use('/api/products',productsRouter)
app.use('/api/carrito',cartsRouter)

const connectedServer = app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})


