const { request, response } = require("express");
const Dao = require("../dao/tipo.dao");
const Ctrl = require("./Ctrl")

class TipoCtrl {
    constructor() {
    }

    inserta = (req = request, res = response) => {
        if(!req.body.tipo) {
            Ctrl.faltaCampo(res, 'tipo')
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
        if(!req.body.tipoid) {
            Ctrl.faltaCampo(res, 'tipoid')
            return
        }
        if(!req.body.tipo) {
            Ctrl.faltaCampo(res, 'tipo')
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
        if(!req.body.tipoid) {
            Ctrl.faltaCampo(res, 'tipoid')
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

module.exports = TipoCtrl
