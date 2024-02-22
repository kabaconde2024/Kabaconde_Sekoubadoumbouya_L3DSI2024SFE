// authController.js
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
        }

        // Créer un nouvel utilisateur avec le mot de passe brut
        const newUser = new User({
            username,
            email,
            password: password.trim(), // Enregistrez le mot de passe brut ici
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: 'Inscription réussie.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
};

const login = async (req, res) => {
    try {
        // Log de la réception de la requête POST sur /connexion
        console.log('Requête POST reçue sur /connexion', req.body);

        const { email, password } = req.body;

        // Vérification de la présence des données du formulaire
        if (!email || !password) {
            return res.status(400).json({ error: 'Les données du formulaire sont manquantes.' });
        }

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ email, password });

        // Vérification des identifiants de l'utilisateur
        if (!user) {
            return res.status(401).json({ error: 'Identifiants incorrects. Veuillez réessayer.' });
        }

        // Réponse de connexion réussie avec le rôle de l'utilisateur
        res.status(200).json({ role: user.role, message: 'Connexion réussie.' });
    } catch (error) {
        // Gestion des erreurs lors de la connexion
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
};




module.exports = { register ,login};
