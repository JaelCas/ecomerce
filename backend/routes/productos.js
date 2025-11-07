import express from "express";
import Productos from "../models/productos.js";
const router = express.Router();
router.post("/", async function (req, res){
    try {
        const {productId, Nombre, Descripcion, Precio, Image} = req.body;
        const newProducto = new Productos({
            productId,
            Nombre,
            Descripcion,
            Precio,
            Image
        });
        await newProducto.save();
        res.status(201).json({message: "Producto creado exitosamente"});
    } catch (error) {
        console.error("Error al guardar producto:", error);
        res.status(500).json({message: "Error al ingresar el producto"});
    }
});
router.get("/",  async (req, res)=>{
    try {
        const productos = await Productos.find(); 
        res.json(productos);
    } catch (error) {
       res.status(500).json({message: "Error al obtener los productos"}); 
    }
});
export default router;