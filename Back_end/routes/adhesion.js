const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {DemandeAdhesion,getDemandes,accepterAdhesion,getDemande} = require('../controller/adhesionController');
router.post('/DemandeAdhesion', DemandeAdhesion);
router.post('/accepterAdhesion', accepterAdhesion);
router.get('/getDemandes', getDemandes);
router.get('/getDemande', getDemande);




module.exports = router;




