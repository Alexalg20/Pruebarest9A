// Importa mongoose para conectar con MongoDB
const mongoose = require('mongoose')

// Importa la configuración donde está la URL de la base de datos
const CONFIG = require('./configuracion')

module.exports = {
    // Variable para almacenar la conexión activa (inicialmente null)
    connection: null, 
    
    // Función para conectar a la base de datos
    connect: () => {
        // Si ya existe una conexión previa, la retorna para evitar reconectar
        if (this.conection) return this.conection 
        
        // Si no hay conexión, intenta conectar con la URL de la configuración (CONFIG.DB)
        return mongoose.connect(CONFIG.DB)
            .then(conn => {
                // Si la conexión es exitosa, guarda la conexión en this.conection
                this.conection = conn
                console.log('La conexión se realizó con éxito')
            })
            .catch(e => 
                // Si ocurre un error, lo muestra en consola
                console.log('Error en la conexión', e)
            )
    }
}
