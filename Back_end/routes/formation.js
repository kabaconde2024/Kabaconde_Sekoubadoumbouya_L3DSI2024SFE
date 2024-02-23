const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerFormation, afficherFormations} = require('../controller/adminformation');
router.post('/creerFormation', creerFormation);
router.get('/afficherFormations', afficherFormations);
module.exports = router;

