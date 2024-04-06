const express = require('express');
const router = express.Router();

// Importer la fonction du contrôleur adhesionController
const { getMessages,ajout } = require('../controller/demandeAdhesionController');

// Définir la route pour récupérer les messages de demande d'adhésion
router.get('/getMessages', getMessages);
router.post('/ajout', ajout);

module.exports = router;
