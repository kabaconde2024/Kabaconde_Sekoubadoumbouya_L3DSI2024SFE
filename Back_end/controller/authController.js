// authController.js
const User = require('../model/User');
const jwt = require('jsonwebtoken');

// Fonction pour récupérer toutes les données d'utilisateurs
const getAllUsers = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs depuis la base de données
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};

// Fonction pour enregistrer un nouvel utilisateur
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
        const { email, password } = req.body;

        // Recherche de l'utilisateur dans la base de données par email
        const user = await User.findOne({ email });

        // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Identifiants incorrects.' });
        }

        // Authentification réussie
        res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
};

module.exports = { register, getAllUsers, login };
