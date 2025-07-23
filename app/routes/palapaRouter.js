// Importa el módulo Express para usar su sistema de rutas
const express = require('express')

// Crea una instancia del router de Express, que permite definir rutas modularmente
const router = express.Router()

// Importa el controlador que contiene la lógica para manejar las rutas de "palapa"
const palapaController = require('../controllers/palapaController')

// Define una ruta GET para '/bebidas' que ejecuta la función buscarTodo del controlador esta ruta obtiene todas las bebidas disponibles
router.get('/bebidas', palapaController.buscarTodo)

// Define una ruta POST para '/bebidas' que ejecuta la función agregar del controlador, esta ruta permite agregar una nueva bebida a la base de datos
.post('/bebidas', palapaController.agregar)

// Define una ruta GET para '/bebidas/:key/:value' con dos funciones middleware en cadena
// Esta ruta busca una bebida según una clave y un valor pasados en la URL
// Primero ejecuta buscarBebida para buscar la bebida, luego mostrarBebida para devolver la respuesta
.get('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.mostrarBebida)

//Buscara lo que llamemos y eliminara la bebida
.delete('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.eliminarBebidas)

.put('/bebidas/:key/:value', palapaController.actualizarBebida)

// Exporta el router configurado para que pueda ser utilizado en app.js
module.exports = router
