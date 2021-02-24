const { Router } = require('express');
const router = Router()
const AgenteCtrl = require('../controller/agente.ctrl');

const ctrl = new AgenteCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
