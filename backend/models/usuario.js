import mongoose from "mongoose"; 
const usuarioSchema = new mongoose.Schema({
    nombre: {type:String,required:true},
    apellido: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true,minlength:10},
    telefono: {type:Number,required:true,minlegth:12},
});
const usuario = mongoose.model("usuario", usuarioSchema, "usuario");
export default usuario;