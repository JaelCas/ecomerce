import express from "express";
import usuario from "../models/usuario.js";
const router = express.Router();
router.post("/", async function (req, res){
    try {
        const {nombre, apellido, email, password, telefono} = req.body;
        if (!nombre || !apellido || !email|| !password || !telefono) {
            return res.status(400).json({message: "Faltan campos o datos obligatorios"})
        }
        const existeusuario = await usuario.find ({email});
        if (existeusuario) {
            return res.status(400).json({message: "Usuario ya existe"})
        }
        const newusuario = new usuario({
            nombre,
            apellido,
            email,
            password,
            telefono
        });
        await newusuario.save();
        res.status(201).json({message: "Usuario creado exitosamente"});
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({message: "Error al ingresar usuario"});
    }
});
router.get("/", async (req, res)=>{
    try {
        const usuario = await usuario.find();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({message: "Error al optener los usuarios".error})
    }
});
export default router;