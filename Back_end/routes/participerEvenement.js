const express = require('express');
const router = express.Router();
const Formation = require('../model/Formation'); // Assurez-vous que vous importez correctement le modèle "Formation"

// Importez la fonction getAllUsers depuis le contrôleur authController
const {ajouterparticiperEvenement,recupererParticipation,afficherparticiperEvenement,participerEvenementuser,supprimerParticipation} = require('../controller/ParticiperEvenementController');
router.post('/ajouterparticiperEvenement', ajouterparticiperEvenement);
router.get('/afficherparticiperEvenement/:id', afficherparticiperEvenement);
router.get('/participerEvenementuser/:userId/:evenementId', participerEvenementuser);
router.delete('/supprimerParticipation/:userId/:evenementId', supprimerParticipation);
router.get('/recupererParticipation', recupererParticipation);



module.exports = router;

