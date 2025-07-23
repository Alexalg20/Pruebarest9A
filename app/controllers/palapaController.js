// Importa Express (aunque aquí no se usa directamente, se puede eliminar si no se usa)
const e = require('express')

// Importa el modelo de Mongoose para la colección "palapa"
const palapaModel = require('../models/palapaModel')

// Función para buscar y devolver todas las bebidas en la base de datos
function buscarTodo(req, res) {
    palapaModel.find({}) // Busca todos los documentos sin filtro
        .then(bebidas => {
            if (bebidas.length) {
                // Si hay bebidas, responde con status 200 (OK) y envía las bebidas
                return res.status(200).send({ bebidas })
            }
            // Si no hay bebidas, responde con status 204 (No Content) y un mensaje
            return res.status(204).send({ mensaje: "No hay nada que mostrar" })
        })
        .catch(e => {
            // Si hay error en la consulta, responde con status 404 (No encontrado) y el error
            return res.status(404).send({ mensaje: `Error al solicitar la información ${e}` })
        })
}

// Función para agregar una nueva bebida a la base de datos
function agregar(req, res) {
    // Crea un nuevo documento con los datos del cuerpo de la petición y lo guarda
    new palapaModel(req.body).save()
        .then(info => {
            // Si se guarda con éxito, responde con status 200 y mensaje de éxito junto con la info guardada
            return res.status(200).send({
                mensaje: "La información se guardó con éxito",
                info
            })
        })
        .catch(e => {
            // Si hay error al guardar, responde con status 404 y mensaje de error
            return res.status(404).send({
                mensaje: `Error al guardar la información ${e}`
            })
        })
}

// Función middleware para buscar una bebida según clave y valor recibidos por parámetros en la URL
function buscarBebida(req, res, next) {
    let consulta = {}
    // Crea un objeto con la clave y valor dinámicos según lo que venga en params
    consulta[req.params.key] = req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
        .then(bebidas => {
            if (!bebidas.length) return next() // Si no encontró nada, pasa al siguiente middleware sin asignar bebidas
            req.body.bebidas = bebidas // Guarda las bebidas encontradas en el cuerpo de la petición para el siguiente middleware
            return next() // Pasa al siguiente middleware
        })
        .catch(e => {
            req.body.e = e // Si hay error, guarda el error para procesarlo en el siguiente middleware
            return next()
        })
}

// Función para mostrar la bebida encontrada o enviar mensajes de error/no contenido
function mostrarBebida(req, res) {
    if (req.body.e)
        // Si hubo error en la búsqueda, responde con status 404 y mensaje de error
        return res.status(404).send({ mensaje: "Error al consultar la información" })
    
    if (!req.body.bebidas)
        // Si no hay bebidas encontradas, responde con status 204 y mensaje indicando que no hay información
        return res.status(204).send({ mensaje: "No hay información que mostrar" })
    
    // Si todo está bien, responde con status 200 y envía las bebidas encontradas
    let bebidas = req.body.bebidas
    return res.status(200).send({ bebidas })
}
//Funcion para eliminar bebidas por el metodo delete
function eliminarBebidas(req,res){
    var bebidas ={}
    bebidas = req.body.bebidas
    palapaModel.deleteOne(bebidas[0])
    .then(inf =>{
        return res.status(200).send({mensaje:"Bebida eliminada"})
    })
    .catch(e =>{
        return res.status(404).send({mensaje:"Error al eliminar la bebida", e})
    })
}
// funcion para actualizar las bebidas
function actualizarBebida(req, res) {
    let filtro = {};
    filtro[req.params.key] = req.params.value;

    palapaModel.updateMany(filtro, req.body)
        .then(inf => {
            return res.status(200).send({
                mensaje: "Bebidas actualizadas correctamente"
            });
        })
    .catch(e =>{
        return res.status(404).send({mensaje:"Error al eliminar la bebida", e})
    })
}


// Exporta las funciones para que puedan ser usadas en el router
module.exports = {
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebidas,
    actualizarBebida
}
