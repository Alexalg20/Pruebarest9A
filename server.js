// Importa la configuración principal de la aplicación Express
const app = require('./app/app')

// Importa el archivo de configuración
const config = require('./app/config/configuracion')

// Importa la conexión a la base de datos (MongoDB)
const conexion = require('./app/config/conexion')

// Ejecuta la conexión a la base de datos
conexion.connect()

// Inicia el servidor en el puerto especificado y muestra un mensaje en consola
app.listen(config.PORT, () => {
    console.log(`Aplicación corriendo en puerto ${config.PORT}`);
})
