const { Router } = require('express');
const router = Router()
const LineaCtrl = require('../controller/linea.ctrl');

const ctrl = new LineaCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
