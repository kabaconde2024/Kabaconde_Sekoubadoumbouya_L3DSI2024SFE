
const User = require('../model/User');
const jwt = require('jsonwebtoken');


// Obtenir la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};

// Supprimer un utilisateur par ID
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
};

module.exports = {
    getAllUsers,
    deleteUserById,
};
