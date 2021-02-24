const { Router } = require('express');
const router = Router()
const MarcaCtrl = require('../controller/marca.ctrl');

const ctrl = new MarcaCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
