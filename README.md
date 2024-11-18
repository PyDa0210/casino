/src
├── /config
│   ├── db.js                // Conexión a la base de datos MongoDB
│   ├── validateEnv.js       // Validación de las variables de entorno
│
├── /routes
│   ├── user.routes.js       // Rutas relacionadas con los usuarios
│   ├── auth.routes.js       // Rutas relacionadas con la autenticación
│   ├── football.routes.js   // Rutas relacionadas con el fútbol
│   ├── bet.routes.js        // Rutas relacionadas con las apuestas
│
├── /controllers
│   ├── user.controller.js   // Lógica relacionada con usuarios
│   ├── auth.controller.js   // Lógica relacionada con autenticación
│   ├── football.controller.js // Lógica relacionada con fútbol
│   ├── bet.controller.js    // Lógica relacionada con apuestas
│
├── /models
│   ├── User.js              // Modelo de usuario
│   ├── Bet.js               // Modelo de apuestas
│   ├── Football.js          // Modelo de fútbol
│
├── /middlewares
│   ├── auth.middleware.js   // Middleware para autenticación
│   ├── errorHandler.js      // Manejo global de errores
│
├── /utils
│   ├── generateToken.js     // Generación de JWT
│   ├── logger.js            // Utilidad para logs personalizados
│
├── /views (opcional)
│   ├── emailTemplates/      // Plantillas HTML para correos electrónicos (opcional)
│
├── app.js                   // Configuración de la aplicación y middlewares
├── index.js                 // Punto de entrada del servidor
├── .env                     // Variables de entorno
├── .eslintrc                // Configuración de ESLint
├── .gitignore               // Archivos/carpetas a ignorar en Git
├── package.json             // Configuración de Node.js
├── README.md                // Documentación del proyecto
