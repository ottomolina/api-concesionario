const { request, response } = require("express")
const Dao = require("../dao/marca.dao")
const Ctrl = require("./Ctrl")

class MarcaCtrl {
    constructor() {
    }

    inserta = (req = request, res = response) => {
        if(!req.body.marca) {
            Ctrl.faltaCampo(res, 'marca')
            return
        }
        const obj = req.body

        Dao.insertar(obj).then(result => {
            result === 1 ? Ctrl.registroOK(res) : Ctrl.resultZero(res)
        }).catch(err => {
            console.log(err);
            Ctrl.errorException(res)
        })
    }

    listado = (req = request, res = response) => {

        Dao.listado().then(result => {
            res.json({datos: result})
        }).catch(err => {
            console.log('Error', err);
            Ctrl.errorException(res)
        })
    }

    actualiza = (req = request, res = response) => {
        if(!req.body.marcaid) {
            Ctrl.faltaCampo(res, 'marcaid')
            return
        }
        if(!req.body.marca) {
            Ctrl.faltaCampo(res, 'marca')
            return
        }
        const obj = req.body
        Dao.actualiza(obj).then(result => {
            result === 1 ? Ctrl.actualizaOK(res) : Ctrl.resultZero(res)
        }).catch(err => {
            console.log(err);
            Ctrl.errorException(res)
        })
    }

    elimina = (req = request, res = response) => {
        if(!req.body.marcaid) {
            Ctrl.faltaCampo(res, 'marcaid')
            return
        }
        const obj = req.body
        Dao.validaIntegridad(obj).then(result => {
            if(result[0].conteo === 0) {
                Dao.elimina(obj).then(result => {
                    result === 1 ? Ctrl.eliminaOK(res) : Ctrl.resultZero(res)
                }).catch(err => {
                    console.log(err);
                    Ctrl.errorException(res)
                })
            } else {
                Ctrl.integridad(res)
            }
        })
    }

}

module.exports = MarcaCtrl
