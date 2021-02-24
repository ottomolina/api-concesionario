const { Router } = require('express');
const router = Router()
const ClienteCtrl = require('../controller/cliente.ctrl');

const ctrl = new ClienteCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
