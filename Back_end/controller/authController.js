// authController.js
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { username, email,telephone } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
        }

        // Créer un nouvel utilisateur avec le mot de passe brut et formations initialisé à un tableau vide
        const newUser = new User({
            username,
            email,
            telephone,
            password: hashedPassword, // Enregistrez le mot de passe brut ici
            formations: [],
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
        const user = await User.findOne({ email });

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(401).json({ error: 'Identifiants incorrects. Veuillez réessayer.' });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Identifiants incorrects. Veuillez réessayer.' });
        }

        // Réponse de connexion réussie avec le rôle et l'ID de l'utilisateur
        res.status(200).json({ roles: user.roles, userId: user._id, username: user.username, email: user.email, message: 'Connexion réussie.' });
        console.log('userId:', user._id);
    } catch (error) {
        // Gestion des erreurs lors de la connexion
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
};


const updateUserById = async (req, res) => {
    try {
        const { username, email,telephone } = req.body;

        const resultat = await User.updateOne(
            { _id: req.params.id },
            { $set: { username, email,telephone } }
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

const ajouterRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { roles } = req.body;

        // Récupérer l'utilisateur par ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier si les rôles à ajouter existent déjà dans le tableau des rôles de l'utilisateur
        const existingRoles = user.roles.filter(role => roles.includes(role));

        if (existingRoles.length > 0) {
            return res.status(400).json({ error: 'Ce rôle est  déjà attribués à l\'utilisateur' });
        }

        // Ajouter les nouveaux rôles
        user.roles.push(...roles);
        await user.save();

        res.json({ message: 'Rôles ajoutés avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des rôles :', error);

        // Vérifier si c'est une erreur de validation due aux rôles déjà existants
        if (error.name === 'ValidationError' && error.message.includes('roles')) {
            return res.status(400).json({ error: 'Certains rôles sont déjà attribués à l\'utilisateur' });
        }

        res.status(500).json({ error: 'Erreur lors de l\'ajout des rôles' });
    }
};



const removeRole = async (req, res) => {
    try {
      const userId = req.params.id;
      const { role } = req.body;
  
      const user = await User.findByIdAndUpdate(userId, { $pull: { roles: role } }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      res.json({ message: `Rôle "${role}" supprimé avec succès` });
    } catch (error) {
      console.error('Erreur lors de la suppression du rôle :', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
    }
  };
  
  const getRoles = async (req, res) => {
    try {
        const userId = req.params.id;

        // Recherche de l'utilisateur dans la base de données par ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Renvoie les rôles de l'utilisateur
        res.status(200).json({ roles: user.roles, message: 'Rôles récupérés avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
    }
};

const getcollaborateurs= async (req, res) => {
    try {
      const collaborateurs = await User.find({ roles: 'collaborateur' });
      res.json(collaborateurs);
    } catch (error) {
      console.error('Erreur lors de la récupération des collaborateurs :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des collaborateurs.' });
    }
  };


  const updatePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const resultat = await User.updateOne(
            { _id: req.params.id },
            { $set: { password: hashedPassword } }
        );

        if (resultat.nModified === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé ou aucun changement apporté." });
        }

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe." });
    }
};



const comparePassword= async (req, res) => {
    const userId = req.params.userId;
    const { oldPassword } = req.body;
  
    try {
      // Récupérez le mot de passe haché de l'utilisateur depuis la base de données
      const user = await User.findById(userId);
      const hashedPassword = user.password; // Assurez-vous que le champ de mot de passe dans votre modèle utilisateur est bien nommé 'password'
  
      // Comparez le mot de passe saisi avec le mot de passe haché
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
  
      // Renvoyez une réponse indiquant si les mots de passe correspondent
      res.json({ passwordMatch });
    } catch (error) {
      console.error('Erreur lors de la comparaison des mots de passe :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la comparaison des mots de passe.' });
    }
  };


module.exports = { register ,comparePassword,updatePassword,login,ajouterRole,removeRole,getRoles,updateUserById,getcollaborateurs};