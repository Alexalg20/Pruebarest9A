// Importa el módulo de Express para crear la aplicación web
const express = require('express')

// Crea una instancia de la aplicación Express
const app = express()

// Importa el router de la funcionalidad "palapa"
// Este archivo contiene las rutas específicas relacionadas con "palapa"
const routerPalapa = require('./routes/palapaRouter')

// Middleware para procesar datos enviados desde formularios HTML
// extended: false indica que no se permiten objetos complejos o anidados
app.use(express.urlencoded({ extended: false }))

// Middleware para procesar solicitudes con datos en formato JSON
app.use(express.json())

// Usa el router de "palapa", asignándole el prefijo /palapa a todas sus rutas
app.use('/palapa', routerPalapa)

// Exporta la aplicación configurada para que pueda ser utilizada en otro archivo (como index.js)
module.exports = app
