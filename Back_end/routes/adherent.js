const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const { getAllUsers, deleteUserById} = require('../controller/adherentController');
router.get('/getAllUsers', getAllUsers);
router.post('/deleteUserById', deleteUserById);
module.exports = router;
