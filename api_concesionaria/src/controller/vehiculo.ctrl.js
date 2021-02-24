const { request, response } = require("express")
const Dao = require("../dao/vehiculo.dao")
const Ctrl = require("./Ctrl")

class VehiculoCtrl {
    constructor() {
    }

    inserta = (req = request, res = response) => {
        if(!req.body.tipoid) { Ctrl.faltaCampo(res, 'tipoid'); return; }
        if(!req.body.marcaid) { Ctrl.faltaCampo(res, 'marcaid'); return; }
        if(!req.body.lineaid) { Ctrl.faltaCampo(res, 'lineaid'); return; }
        if(!req.body.cc) { Ctrl.faltaCampo(res, 'cc'); return; }
        if(!req.body.color) { Ctrl.faltaCampo(res, 'color'); return; }
        if(!req.body.modelo) { Ctrl.faltaCampo(res, 'modelo'); return; }
        if(!req.body.precio) { Ctrl.faltaCampo(res, 'precio'); return; }
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
        if(!req.body.vehiculoid) { Ctrl.faltaCampo(res, 'vehiculoid'); return; }
        if(!req.body.tipoid) { Ctrl.faltaCampo(res, 'tipoid'); return; }
        if(!req.body.marcaid) { Ctrl.faltaCampo(res, 'marcaid'); return; }
        if(!req.body.lineaid) { Ctrl.faltaCampo(res, 'lineaid'); return; }
        if(!req.body.cc) { Ctrl.faltaCampo(res, 'cc'); return; }
        if(!req.body.color) { Ctrl.faltaCampo(res, 'color'); return; }
        if(!req.body.modelo) { Ctrl.faltaCampo(res, 'modelo'); return; }
        if(!req.body.precio) { Ctrl.faltaCampo(res, 'precio'); return; }
        const obj = req.body
        Dao.actualiza(obj).then(result => {
            result === 1 ? Ctrl.actualizaOK(res) : Ctrl.resultZero(res)
        }).catch(err => {
            console.log(err);
            Ctrl.errorException(res)
        })
    }

    elimina = (req = request, res = response) => {
        if(!req.body.vehiculoid) {
            Ctrl.faltaCampo(res, 'vehiculoid')
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

module.exports = VehiculoCtrl
