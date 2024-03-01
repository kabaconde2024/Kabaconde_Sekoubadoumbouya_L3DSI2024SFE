const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {ajout} = require('../controller/adhesionController');
router.post('/ajout', ajout);
module.exports = router;




