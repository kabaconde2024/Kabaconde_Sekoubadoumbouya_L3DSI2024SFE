const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerFormation, afficherFormation,Afficher,updateFormation,deleteFormationById,afficher,afficherFormations,accepterFormation,accepterSession,formationsByFormateur,recupererSessionsFormation} = require('../controller/adminformation');
router.post('/creerFormation', creerFormation);
router.post('/accepterFormation', accepterFormation);
router.get('/afficherFormation', afficherFormation);
router.get('/Afficher/:id', Afficher);
router.get('/afficherFormations', afficherFormations);
router.get('/recupererSessionsFormation/:formationId', recupererSessionsFormation);
router.get('/afficher/:id', afficher);
router.put('/updateFormation/:id', updateFormation);
router.delete('/deleteFormationById/:id', deleteFormationById);
router.get('/formationsByFormateur/:id', formationsByFormateur);





module.exports = router;

