const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { register,  login ,ajouterRole,removeRole,getRoles,updateUserById} = require('../controller/authController');
router.post('/register', register);
router.post('/login', login);
router.put('/ajouterRole/:id', ajouterRole);
router.delete('/removeRole/:id', removeRole);
router.get('/getRoles/:id', getRoles);
router.put('/updateUserById/:id', updateUserById);



module.exports = router;