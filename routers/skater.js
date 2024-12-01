const { Router } = require('express');
const router = Router();
const {createSkaterController,SkaterProfileController,updateEstadoController,updateSkaterController} = require('../controllers/skater')
const validarRegistro = require('../middlewares/validator.js')

router.post('/register', validarRegistro, createSkaterController); // Registrarse
router.get('/:id', SkaterProfileController); //Ruta perfil Skater

router.post('/actualizarEstado', updateEstadoController);//update estado
router.post('/actualizarSkater',updateSkaterController ); //actualizacion para skaters

module.exports = router;