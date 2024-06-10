const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { register, getFormateur,comparePassword,updatePassword, login ,ajouterRole,removeRole,getRoles,updateUserById,getcollaborateurs} = require('../controller/authController');
router.post('/register', register);
router.post('/login', login);
router.put('/ajouterRole/:id', ajouterRole);
router.delete('/removeRole/:id', removeRole);
router.get('/getRoles/:id', getRoles);
router.get('/getcollaborateurs', getcollaborateurs);
router.put('/updateUserById/:id', updateUserById);
router.put('/updatePassword/:id',updatePassword);
router.post('/comparePassword/:userId', comparePassword);
router.get('/getFormateur', getFormateur);




module.exports = router;