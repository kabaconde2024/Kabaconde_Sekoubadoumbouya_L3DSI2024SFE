const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { register, getAllUsers, login } = require('../controller/authController');

// Définissez la route pour l'enregistrement d'un nouvel utilisateur
router.post('/register', register);
// Définissez la route pour récupérer tous les utilisateurs
router.get('/users', getAllUsers);
router.post('/login', login);

module.exports = router;

module.exports = router;

