const { Router } = require('express');
const router = Router()
const CotizacionCtrl = require('../controller/cotizacion.ctrl');

const ctrl = new CotizacionCtrl()

router.put('/', ctrl.inserta)
router.get('/', ctrl.listado)
router.get('/porFecha', ctrl.listado)
router.post('/', ctrl.actualiza)
router.delete('/', ctrl.elimina)


module.exports = router
