const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { EffectuerPayement,recupererPaiements,recupererPaiementsUtilisateur} = require('../controller/payementController');
router.post('/EffectuerPayement', EffectuerPayement);
router.get('/recupererPaiements',recupererPaiements);
router.get('/recupererPaiementsUtilisateur/:userId/session/:sessionId', recupererPaiementsUtilisateur);


module.exports = router;

