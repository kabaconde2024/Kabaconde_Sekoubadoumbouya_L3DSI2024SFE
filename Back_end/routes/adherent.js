const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { getAllUsers, deleteUserById,updateUserById} = require('../controller/adherentController');
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUserById/:id', deleteUserById);
router.put('/updateUserById/:id', updateUserById);

module.exports = router;
