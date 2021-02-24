const { Router } = require('express');
const router = Router()
const TipoCtrl = require('../controller/tipo.ctrl');

const ctrl = new TipoCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
