const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerFormation, afficherFormation,updateFormation,deleteFormationById,afficher,afficherFormations,accepterFormation,formationsByFormateur} = require('../controller/adminformation');
router.post('/creerFormation', creerFormation);
router.post('/accepterFormation', accepterFormation);
router.get('/afficherFormation', afficherFormation);
router.get('/afficherFormations', afficherFormations);
router.get('/afficher/:id', afficher);
router.put('/updateFormation/:id', updateFormation);
router.delete('/deleteFormationById/:id', deleteFormationById);
router.get('/formationsByFormateur/:id', formationsByFormateur);






module.exports = router;

