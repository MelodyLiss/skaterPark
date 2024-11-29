const { Router } = require('express');
const router = Router();
const {createSkaterController,SkaterProfileController,updateEstadoController} = require('../controllers/skater')
const validarRegistro = require('../middlewares/validator.js')

router.post('/register', validarRegistro, createSkaterController); // Registrarse
router.get('/:id', SkaterProfileController); //Ruta perfil Skater
router.post('/actualizarEstado', updateEstadoController);



module.exports = router;