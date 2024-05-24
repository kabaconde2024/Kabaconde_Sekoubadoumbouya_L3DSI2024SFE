const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {EffectuerPayement,recupererPaiements,recupererPaiementsUtilisateur,PaiementsUtilisateur} = require('../controller/payementController');
router.post('/EffectuerPayement', EffectuerPayement);
router.get('/recupererPaiements',recupererPaiements);
router.get('/recupererPaiementsUtilisateur/:userId/session/:sessionId', recupererPaiementsUtilisateur);
router.get('/PaiementsUtilisateur/:userId', PaiementsUtilisateur);

module.exports = router;

