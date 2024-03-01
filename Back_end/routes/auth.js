const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { register,  login ,ajouterRole} = require('../controller/authController');
router.post('/register', register);
router.post('/login', login);
router.put('/ajouterRole/:id', ajouterRole);
module.exports = router;