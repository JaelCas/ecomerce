import Pedidos from "../models/pedidos.js";

export const crearpedido = async (req, res) => {
  console.log("Pedido recibido:",req.body);
  try {
    const { email, direccion, metodo_pago, productos, total } = req.body;

    if (!email || !direccion || !metodo_pago || !productos || !total) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "No se enviaron productos" });
    }

    const fecha = new Date();

    const newPedido = new Pedidos({
      pedidoId: Date.now().toString(),
      email,
      direccion,
      fecha,
      productos,      // <-- directamente el array
      metodo_pago,
      estado: "pendiente",
      total
    });

    await newPedido.save();

    res.status(201).json({ message: "Pedido creado exitosamente", pedido: newPedido });

  } catch (error) {
    console.error("Error al guardar pedido:", error);
    res.status(500).json({ message: "Error al ingresar pedido" });
  }
};



// Obtener pedidos
export const obtenerpedido = async (req, res) => {
  try {
    const listaPedidos = await Pedidos.find();
    res.json(listaPedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};
