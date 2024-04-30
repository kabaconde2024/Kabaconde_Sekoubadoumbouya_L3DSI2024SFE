const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerDepense,recupererDepenses,supprimerDepenses,modifierDepense} = require('../controller/depenseController');
router.post('/creerDepense', creerDepense);
router.get('/recupererDepenses', recupererDepenses);
router.put('/modifierDepense/:id', modifierDepense);
router.delete('/supprimerDepenses/:id', supprimerDepenses);

module.exports = router;

