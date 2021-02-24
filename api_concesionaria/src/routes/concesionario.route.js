const { Router } = require('express');
const router = Router()
const ConcesionarioCtrl = require('../controller/concesionario.ctrl');

const ctrl = new ConcesionarioCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
