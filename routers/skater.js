const { Router } = require('express');
const router = Router();
const {createSkaterController,SkaterProfileController} = require('../controllers/skater')
const validarRegistro = require('../middlewares/validator.js')

router.post('/register', validarRegistro, createSkaterController); // Registrarse


router.get('/:id', SkaterProfileController); //Ruta perfil Skater


module.exports = router;