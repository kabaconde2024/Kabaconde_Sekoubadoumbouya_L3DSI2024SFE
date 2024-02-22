const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { register,  login } = require('../controller/authController');
router.post('/register', register);
router.post('/login', login);
module.exports = router;



