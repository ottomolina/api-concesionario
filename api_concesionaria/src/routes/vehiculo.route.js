const { Router } = require('express');
const router = Router()
const VehiculoCtrl = require('../controller/vehiculo.ctrl');

const ctrl = new VehiculoCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
