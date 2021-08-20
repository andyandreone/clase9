const express = require('express')
const router = express.Router()

let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}


productos.push(new Producto ("Computadora", 90000, "http://placehold.it/300x300"))
productos.push(new Producto ("Impresora", 65000, "http://placehold.it/300x300"))
productos.push(new Producto ("Teclado", 2000, "http://placehold.it/300x300"))


router.get("/listar", (req, res) => {
  try {
    if (productos.length > 0) {
      res.status(200).json(productos);
    } else {
      res.status(404).json({ error: "no hay productos cargados" });
    }
  } catch (err) {
    res.status(404).json({ err });
  }
});


router.get("/listar/:id", (req, res) => {
  try {
    if (req.params.id <= productos.length) {
      res.status(200).json(productos[req.params.id - 1]);
    } else {
      res.status(404).json({ error: "producto no encontrado" });
    }
  } catch (err) {
    res.status(404).json({ err });
  }
});

router.post("/guardar", (req, res) => {
   
    let title = req.query.title
    let thumbnail = req.query.thumbnail
    let price = parseInt(req.query.price)
          
        try{
            productos.push(new Producto(title, price, thumbnail))
            res.status(200).json(productos[productos.length -1])
            
        }catch(err) {
            res.status(404).json(err)
        }
})


router.put("/actualizar/:id", (req, res) => {

    try {
        let id = parseInt(req.params.id)
        productos[id-1] = {
            "id": parseInt(id),
            "title": req.query.title,
            "price": parseInt(req.query.price),
            "thumbnail": req.query.thumbnail
        }
        res.json(productos[id-1])
    } catch(err){
        throw new Error(err)
    }
})

router.delete("/borrar/:id", (req, res) => {

    try {

        let id = parseInt(req.params.id)

            if(id-1 < productos.length){
                res.status(200).json(productos[id-1])

                var i = productos.indexOf(productos[id-1] );
                if(i !== -1){
                    productos.splice( i, 1 );
                } 
            } else {
                res.status(200).json({"msg":"No hay productos"})
            }
    
    }catch(err) {
        throw new error(err)
    }
   
})


router.use(express.json()); 


router.use(express.urlencoded({ extended: true })); 




module.exports = router;
