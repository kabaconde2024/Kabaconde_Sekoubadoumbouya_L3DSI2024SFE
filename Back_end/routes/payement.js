const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { EffectuerPayement} = require('../controller/payementController');
router.post('/EffectuerPayement', EffectuerPayement);


module.exports = router;

