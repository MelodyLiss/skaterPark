const { Router } = require('express');
const router = Router();
const { loginController,perfilController  } = require('../controllers/auth'); 
const authMiddleware = require('../middlewares/auth'); 


router.post('/login', loginController); 
router.get('/user/:id', authMiddleware, perfilController);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/skaterpark/login');
});

module.exports = router;
