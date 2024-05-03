const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {modifierPaye,DemandeAdhesion,getDemandes,supprimerDemande,accepterAdhesion,getDemande,getDemandesByUser} = require('../controller/adhesionController');
router.post('/DemandeAdhesion', DemandeAdhesion);
router.post('/accepterAdhesion', accepterAdhesion);
router.get('/getDemande', getDemande);
router.get('/getDemandes', getDemandes);
router.get('/getDemandesByUser/:userId', getDemandesByUser);
router.delete('/supprimerDemande/:userId', supprimerDemande);
router.put('/modifierPaye/:userId',modifierPaye);

module.exports = router;




