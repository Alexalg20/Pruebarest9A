// Importa el módulo mongoose para trabajar con MongoDB
const mongoose = require('mongoose')

// Define el esquema para la colección "bebidas" (palapas)
const palapaschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    capacidad: {
        type: String,
        require: true
    },
    existencia: {
        type: Number,
        default: 10
    }
})

// Crea el modelo "bebidas" basado en el esquema definido
const palapaModel = mongoose.model('bebidas', palapaschema)

// Exporta el modelo para que pueda ser usado en otras partes de la aplicación
module.exports = palapaModel
