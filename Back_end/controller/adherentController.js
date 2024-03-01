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
        const resultat = await User.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
};

const updateUserById = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const resultat = await User.updateOne(
            { _id: req.params.id },
            { $set: { username, email, password } }
        );

        if (resultat.nModified === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé ou aucune modification apportée." });
        }

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
    }
};



module.exports = {
    getAllUsers,
    deleteUserById,
    updateUserById,
    
};