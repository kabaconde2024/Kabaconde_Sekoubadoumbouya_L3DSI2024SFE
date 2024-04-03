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



const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête

        // Rechercher l'utilisateur dans la base de données par son ID
        const user = await User.findById(userId);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Envoyer les détails de l'utilisateur en tant que réponse
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des détails de l'utilisateur." });
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
    getUserById,
    
};