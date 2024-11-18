//src/config/db.js
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

//configuracion funcional a la base de datos de mongoDB 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Base de datos conectada exitosamente: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

