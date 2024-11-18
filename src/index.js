//src/index.js
import app  from './app.js' //importa la apliacion desde app.js
import connectDB from './config/db.js'; //importa la conexion a la base de datos
import dotenv from 'dotenv'; //importa variables de entorno 
import validateEnv from './config/validateEnv.js'; //importa la validacion de el .env


dotenv.config(); // carga variables de entorno 
validateEnv();  // Valida las variables de entorno

// define el puerto en .env |  puerto de escucha por si falla.
const PORT = process.env.PORT || 5000; 
//conexion con la base de datos.
connectDB(); 
//inicia el servidor y muestra mensaje de inicio.    
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });   