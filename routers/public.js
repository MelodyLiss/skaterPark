const { Router } = require('express');
const router = Router();
const {findAllSkatersController,findByAttributesController }= require('../controllers/skater')

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/bases', (req, res) => {
    res.render('paginaEnConstruccion');
});

router.get('/jurado', (req, res) => {
    res.render('paginaEnConstruccion');
});

router.get('/contacto', (req, res) => {
    res.render('paginaEnConstruccion');
});

router.get('/register', (req, res) => {
    res.render('panelRegister');
});

router.get('/participantes',findAllSkatersController )
router.get('/filtrarParticipantes', findByAttributesController)//filtrar participantes
module.exports = router;
