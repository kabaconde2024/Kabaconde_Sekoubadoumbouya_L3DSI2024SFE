const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerDon,recupererDon,supprimerDon,modifierDon} = require('../controller/donController');
router.post('/creerDon', creerDon);
router.get('/recupererDon', recupererDon);
router.put('/modifierDon/:id', modifierDon);
router.delete('/supprimerDon/:id', supprimerDon);
module.exports = router;

