import bcrypt from "bcrypt";
import usuario from "../models/usuario.js";

export const loginusuario = async (req, res)=> {
    try {
        const {email, password}=req.body;
        //validar que los campos obligatorios no esten vacios
        if (!email || !password) {
            return res.status(400).json({message: "Correo y contraseña son obligatorios"});
        }
        //buscamos el usuario en la base de datos
        const usuario = await usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
        //comparar la contraseña 
        const passwordValida = await bcrypt.compare(password, usuario.password)
        if (!passwordValida){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }
        //login exitoso
        res.status(200).json({message: "Login exitoso"});
    } catch (error) {
        res.status(500).json({message: "Error al inicair sesion", error:error.message})
    }
}