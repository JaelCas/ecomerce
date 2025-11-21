import bcrypt from "bcrypt";
import user from "../models/usuario.js";
import usuario from "../models/usuario.js";
 export const newusuario = async (req, res)=>{
    try {
        const {nombre, apellido, email, telefono, password}=req.body;
        if (!nombre || !apellido || !email || !telefono || !password) {
            return res.status(400).json({message:"Este campo es obligatorio"});
        }
        const Password = await user.findOne
        ({email});
        if (!Password){
            return res.status(400).json({message:"Contraseña no coincide"});
        }
        const passwordValida = await bcrypt.compare(password, Password.password)
        if(!passwordValida){
            return res.status(401).json({message:"Contraseña incorrecta"});
        }
        res.status(200).json({message:"Cuenta creada exitosamente",
            usuario:{
                id: usuario._id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({message:"Error al crear cuenta", error:error.message})
    }
 }