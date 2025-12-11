import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  id: { type: String, required: true },       // ID del producto
  nombre: { type: String, required: true },   // Nombre del producto
  precio: { type: Number, required: true },   // Precio unitario
  cantidad: { type: Number, required: true }, // Cantidad comprada
  imagen: { type: String }                    // URL de la imagen (opcional)
});

const pedidosSchema = new mongoose.Schema({
  pedidoId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  fecha: { type: Date, required: true },
  productos: { type: [productoSchema], required: true }, // Array de productos
  metodo_pago: { type: String, required: true },
  estado: { 
    type: String, 
    enum: ["pendiente", "procesando", "enviado", "entregado", "cancelado"], 
    default: "pendiente" 
  },
  total: { type: Number, required: true }
});

const Pedidos = mongoose.model("Pedidos", pedidosSchema, "pedidos");

export default Pedidos;
