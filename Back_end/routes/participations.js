const express = require('express');
const router = express.Router();
const Formation = require('../model/Formation'); // Assurez-vous que vous importez correctement le modèle "Formation"

// Importez la fonction getAllUsers depuis le contrôleur authController
const { afficherparticipation, ajouterparticiaption} = require('../controller/ParticipationController');
router.post('/ajouterparticiaption', ajouterparticiaption);
router.get('/afficherparticipation/:id', afficherparticipation);

module.exports = router;

