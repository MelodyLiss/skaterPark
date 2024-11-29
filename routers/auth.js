const { Router } = require('express');
const router = Router();
const {findAllSkatersController,deleteSkaterController} =require('../controllers/skater')
const { loginController,perfilController  } = require('../controllers/auth'); 
const authMiddleware = require('../middlewares/auth'); 


router.post('/login', loginController); 
router.get('/user/:id', authMiddleware, perfilController); //skater
router.get('/admin', authMiddleware, findAllSkatersController); 
router.get('/delete',deleteSkaterController);





router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/skaterpark/login');
});

module.exports = router;