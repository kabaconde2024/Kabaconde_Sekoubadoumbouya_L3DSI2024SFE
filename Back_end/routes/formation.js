const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { creerFormation, afficherFormation,updateFormation,deleteFormationById,afficher,afficherFormations} = require('../controller/adminformation');
router.post('/creerFormation', creerFormation);
router.get('/afficherFormation', afficherFormation);
router.get('/afficherFormations', afficherFormations);
router.get('/afficher/:id', afficher);
router.put('/updateFormation/:id', updateFormation);
router.delete('/deleteFormationById/:id', deleteFormationById);




module.exports = router;

