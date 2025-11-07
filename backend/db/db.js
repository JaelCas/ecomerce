import mongoose from 'mongoose';
const uri = "mongodb+srv://adsotarde:julio1620@ecommmer.o3hm8ce.mongodb.net/tienda?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a la base de datos"))
  .catch(err => console.log("❌ error al conectar la base de datos:", err));