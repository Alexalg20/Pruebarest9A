const mongoose = require('mongoose')
const CONFIG = require('./configuracion')

module.exports={
    connection : null, // importar dos variables conexion y conectar
    connect : () => {
        if(this.conection)return this.conection 
        return mongoose.connect(CONFIG.DB) // retorna la conexion a
        .then(conn =>{ //Recibe una peticion y envia una respuesta
            this.conection = conn
            console.log('la conexion se realizo con exito')
        })
        .catch(e => console.log('error en la conexion', e))
    }
}