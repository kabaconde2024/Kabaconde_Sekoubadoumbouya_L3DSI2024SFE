const User = require('../model/User');
const jwt = require('jsonwebtoken');
const Session = require('../model/Session');


// Obtenir la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        // Filtrer les utilisateurs par le rôle "formateur" et archive false
        const users = await User.find({ archive: false }); 

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};
const getAllUsersName = async (req, res) => {
    try {
        const users = await User.find().select('username'); // Sélectionnez uniquement les noms d'utilisateur

        res.status(200).json(users.map(user => user.username)); // Renvoyer uniquement les noms d'utilisateur
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};



const getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du nombre d'utilisateurs." });
    }
};

const getFormateur = async (req, res) => {
    try {
        const users = await User.find({ roles: 'formateur' }); // Filtrer les utilisateurs par le rôle "formateur"

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};


/*
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

*/
const getUserById = async (req, res) => {
    try {
        const session = await User.findById(req.params.id);
        
        if (!session) {
            return res.status(404).json({ message: 'User non trouvée.' });
        }

        res.status(200).json(session);
    } catch (error) {
        console.error('Erreur lors de la récupération de la session :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération de la session.' });
    }
};

// Supprimer un utilisateur par ID
const deleteUserById = async (req, res) => {
    try {
        // Marquer l'utilisateur comme archivé
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { archive: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: 'Utilisateur archivé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'archivage de l'utilisateur." });
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
    getFormateur,
    getUserCount,
    getAllUsersName,
    
};