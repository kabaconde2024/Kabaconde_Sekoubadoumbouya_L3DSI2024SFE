const express = require('express');
const router = express.Router();

// Importez la fonction getAllUsers depuis le contrôleur authController
const {getAllUsersName, getAllUsers,getUserCount, deleteUserById,updateUserById,ajouterRole,getUserById,getFormateur} = require('../controller/adherentController');
router.get('/getAllUsers', getAllUsers);
router.get('/getFormateur', getFormateur);
router.get('/getUserById/:id', getUserById);
router.delete('/deleteUserById/:id', deleteUserById);
router.put('/updateUserById/:id', updateUserById);
router.get('/getUserCount', getUserCount);
router.get('/getAllUsersName', getAllUsersName);



module.exports = router;
