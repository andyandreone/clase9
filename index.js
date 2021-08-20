const express = require('express')
const products = require("./routes/productos.route")
var multer = require('multer');

let storage = multer.diskStorage ({
    destination: function (req, file, callback){
        callback(null, "uploads")
    },
    filename:function(req, file, callback){
        callback(null, file.originalname)
    }
})

var upload = multer({storage});

let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}


const app = express();
app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080');
})

app.use('/api/productos', products)
app.use(express.static('public'))


app.post("/upload", upload.single("myFile"),(req, res, next) => {
    let title = req.body.title
    let price = parseInt(req.body.price)
    let thumbnail = req.file.path
  
            if (!req.file) {
                const error = new Error("Sin archivos")
                error.httpStatusCode = 400
                return next(error)
            }
            productos.push(new Producto(title, price, thumbnail))
            res.send(productos[productos.length -1])
       
   
})

