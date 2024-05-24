const express = require('express');
const router = express.Router();
const Formation = require('../model/Formation'); // Assurez-vous que vous importez correctement le modèle "Formation"

// Importez la fonction getAllUsers depuis le contrôleur authController
const {countParticipants,countParticipation, afficherparticipation, ajouterparticiaption,afficherToutesParticipations,updatedParticipation} = require('../controller/ParticipationController');
router.post('/ajouterparticiaption', ajouterparticiaption);
router.get('/afficherparticipation/:id', afficherparticipation);
router.get('/afficherToutesParticipations', afficherToutesParticipations);
router.put('/updatedParticipation/:id', updatedParticipation);
router.get('/countParticipants/:sessionId', countParticipants);
router.get('/countParticipation', countParticipation);




module.exports = router;

