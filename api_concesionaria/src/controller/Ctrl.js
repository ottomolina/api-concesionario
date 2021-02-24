const { response } = require("express");

const registroOK = (res = response) => {
    res.json({mensaje: 'Registro insertado.'})
}

const actualizaOK = (res = response) => {
    res.json({mensaje: 'El registro ha sido actualizado.'})
}

const eliminaOK = (res = response) => {
    res.json({mensaje: 'El registro ha sido eliminado.'})
}

const resultZero = (res = response) => {
    res.status(500).json({mensaje: 'Algo ha ido mal, reintente en unos momentos.'})
}

const errorException = (res = response) => {
    res.status(500).json({mensaje: 'Disculpe los inconvenientes, ha ocurrido un error.'})
}

const faltaCampo = (res = response, campo = String) => {
    res.status(417).json({mensaje: `Falta el campo '${campo}'`})
}

const integridad = (res = response) => {
    res.json({mensaje: `Para proteger la integridad de la información, no es posible eliminar este registro.`})
}

module.exports = {
    registroOK,
    actualizaOK,
    eliminaOK,
    resultZero,
    errorException,
    faltaCampo,
    integridad
}