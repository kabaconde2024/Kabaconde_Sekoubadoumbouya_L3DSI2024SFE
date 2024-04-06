const express = require('express');
const Formation = require('../model/Formation');

const Sessions = require('../model/Session');
const Users = require('../model/User');


const creerSession = async (req, res) => {
    try {
        const { formation, dateDebut, dateFin, lieu, capacite, userSession } = req.body;

        // Créer une nouvelle session
        const nouvelleSession = new Sessions({
            formation,
            dateDebut,
            dateFin,
            lieu,
            capacite,
            userSession,
        });

        // Sauvegarder la session dans la base de données
        await nouvelleSession.save();

        // Mettre à jour la référence de session dans les formations associées
        await Formation.updateMany({ _id: { $in: formation } }, { $push: { sessions: nouvelleSession._id } });

        // Mettre à jour la référence de sessionformateur dans les utilisateurs associés
        // Si userSession est un tableau d'IDs d'utilisateurs, vous pouvez mettre à jour chaque utilisateur
        // pour ajouter cette nouvelle session à sa liste de sessions formées
        await Users.updateMany({ _id: { $in: userSession } }, { $push: { sessionformateur: nouvelleSession._id } });

        // Affecter le rôle de formateur aux utilisateurs
        // Si userSession est un tableau d'IDs d'utilisateurs, vous pouvez affecter le rôle à chaque utilisateur
        await Users.updateMany({ _id: { $in: userSession } }, { $addToSet: { roles: "formateur" } });

        res.status(201).json({ message: 'Session créée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la session.' });
    }
};




const afficherSessions = async (req, res) => {
    try {
        // Récupérer toutes les sessions de la base de données
        const toutesLesSessions = await Sessions.find();

        // Envoyer les sessions récupérées en réponse
        res.status(200).json(toutesLesSessions);
    } catch (error) {
        console.error('Erreur lors de la récupération des sessions :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des sessions' });
    }
};




const updateSession = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID à partir des paramètres de l'URL
        const { dateDebut, dateFin, lieu, formateur, capacite,userSession } = req.body;

        // Vérifier si la session existe
        const existingSession = await Sessions.findById(id);

        if (!existingSession) {
            return res.status(404).json({ message: 'Session non trouvée.' });
        }

        // Mettre à jour les propriétés de la session
        existingSession.dateDebut = dateDebut || existingSession.dateDebut;
        existingSession.dateFin = dateFin || existingSession.dateFin;
        existingSession.lieu = lieu || existingSession.lieu;
        existingSession.formateur = formateur || existingSession.formateur;
        existingSession.capacite = capacite || existingSession.capacite;
        existingSession.userSession = userSession || existingSession.userSession;
        

        // Sauvegarder les modifications dans la base de données
        await existingSession.save();

        res.status(200).json({ message: 'Session mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la session.' });
    }
};

const deleteSessionById = async (req, res) => {
    try {
        // Trouver la session à supprimer
        const session = await Sessions.findOne({ _id: req.params.id });
        
        // Vérifier si la session existe
        if (!session) {
            return res.status(404).json({ message: 'Session non trouvée.' });
        }

        // Récupérer l'ID de l'utilisateur affecté à la session
        const userId = session.userSession;

        // Trouver toutes les sessions de l'utilisateur
        const userSessions = await Sessions.find({ userSession: userId });

        // Supprimer la session
        const resultat = await Sessions.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: 'Session non trouvée.' });
        }

        // Trouver l'utilisateur affecté à la session
        const user = await Users.findOne({ _id: userId });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Supprimer la référence à la session dans le modèle de l'utilisateur
        user.sessionformateur = user.sessionformateur.filter(sessionId => sessionId.toString() !== req.params.id);

        // Vérifier si l'utilisateur a d'autres sessions
        if (userSessions.length === 1) {
            // Si l'utilisateur n'a qu'une seule session, supprimer le rôle de formateur
            user.roles = user.roles.filter(role => role !== 'formateur');
        }

        // Enregistrer les modifications apportées à l'utilisateur
        await user.save();

        res.status(200).json({ message: 'Session supprimée avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: 'Erreur lors de la suppression de la session.' });
    }
};


const afficherDetailsSession = async (req, res) => {
    try {
        const session = await Sessions
            .findById(req.params.id)
            .populate('formation'); // Utilisez le nom de la référence définie dans le modèle Session

        if (!session) {
            return res.status(404).json({ message: 'Session non trouvée.' });
        }

        // La session maintenant contient tous les détails de la formation
        res.status(200).json(session);
    } catch (error) {
        console.error('Erreur lors de l\'affichage des détails de la session :', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'affichage des détails de la session.' });
    }
};


const sessionsFormateur = async (req, res) => {
    try {
        const userId = req.params.userId; // Supposons que vous recevez l'ID de l'utilisateur dans les paramètres de la requête
        
        // Trouver l'utilisateur par son ID et populer les sessions formateur
        const utilisateur = await Users.findById(userId).populate('sessionformateur');

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Retourner les sessions formateur de l'utilisateur
        res.status(200).json({ sessionsFormateur: utilisateur.sessionformateur });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des sessions du formateur.' });
    }
};

module.exports = {
    creerSession,
    afficherSessions,
    updateSession,
    deleteSessionById,
    afficherDetailsSession,
    sessionsFormateur,
};
