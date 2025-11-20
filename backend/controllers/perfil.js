//importamos el modelo
import user from "../models/usuario.js";

//obtenemos perfil del usuario de la base de datos 
export const obtenerPerfil = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message:"Email es requerido"});
        }
        //Traer el correo del usuario desde la base de datos
        const usuario = await user.findOne({email:email}).select('-password');
        if(!usuario){
            return res.status(400).json({message:"Usuario no encontrado"});
        }
        res.status(200).json({
            usuario:{
                id:usuario._id,
                nombre:usuario.nombre,
                email:usuario.email,
                telefono:usuario.telefono
            }
        });
    } catch (error) {
        res.status(500).json({message:"Error al obtener el perfil", error:error.message});
    }
}