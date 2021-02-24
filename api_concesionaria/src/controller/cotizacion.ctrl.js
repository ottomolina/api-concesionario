const { request, response } = require("express")
const Dao = require("../dao/cotizacion.dao")
const Ctrl = require("./Ctrl")

class CotizacionCtrl {
    constructor() {
    }

    inserta = (req = request, res = response) => {
        if(!req.body.agenteid) {
            Ctrl.faltaCampo(res, 'agenteid')
            return
        }
        if(!req.body.clienteid) {
            Ctrl.faltaCampo(res, 'clienteid')
            return
        }
        if(!req.body.vehiculoid) {
            Ctrl.faltaCampo(res, 'vehiculoid')
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
        const obj = req.body
        Dao.listado(obj).then(result => {
            res.json({datos: result})
        }).catch(err => {
            console.log('Error', err);
            Ctrl.errorException(res)
        })
    }

    actualiza = (req = request, res = response) => {
        if(!req.body.cotizacionid) {
            Ctrl.faltaCampo(res, 'cotizacionid')
            return
        }
        if(!req.body.agenteid) {
            Ctrl.faltaCampo(res, 'agenteid')
            return
        }
        if(!req.body.clienteid) {
            Ctrl.faltaCampo(res, 'clienteid')
            return
        }
        if(!req.body.vehiculoid) {
            Ctrl.faltaCampo(res, 'vehiculoid')
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
        if(!req.body.cotizacionid) {
            Ctrl.faltaCampo(res, 'cotizacionid')
            return
        }
        const obj = req.body
        Dao.elimina(obj).then(result => {
            result === 1 ? Ctrl.eliminaOK(res) : Ctrl.resultZero(res)
        }).catch(err => {
            console.log(err);
            Ctrl.errorException(res)
        })
    }

}

module.exports = CotizacionCtrl
