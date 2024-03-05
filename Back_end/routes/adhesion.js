const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {ajout,getDemandes,accepterAdhesion} = require('../controller/adhesionController');
router.post('/ajout', ajout);
router.post('/accepterAdhesion', accepterAdhesion);
router.get('/getDemandes', getDemandes);

module.exports = router;




