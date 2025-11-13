import express from 'express';
import cors from 'cors';
import "./db/db.js";
import productosRoutes from './routes/productos.js';
import usuarioRoutes from './routes/usuario.js';
import { loginusuario } from './controllers/login.js';

const app = express();

// Habilitar todas las rutas
app.use(cors());
app.use(express.json());

// Primera ruta
app.get('/', (req, res) => {
    res.send('Bienvennido al curso de node express');
});
app.use("/api/producto", productosRoutes);
app.listen(8081, () => console.log('Servidor corriendo en http://localhost:8081'));
app.use("/api/usuario", usuarioRoutes);
app.use("/api/login", loginusuario); 

