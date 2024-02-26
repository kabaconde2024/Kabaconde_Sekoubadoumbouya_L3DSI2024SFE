const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { ajouterUserFormation,getUserFormations} = require('../controller/userFormationController');
router.post('/ajouterUserFormation', ajouterUserFormation);
router.get('/getUserFormations', getUserFormations);


module.exports = router;
