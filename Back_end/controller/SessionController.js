const express = require('express');
const Formation = require('../model/Formation');

const Sessions = require('../model/Session');

const creerSession = async (req, res) => {
    try {
        const { formation, dateDebut, dateFin, lieu, capacite } = req.body;

        // Créer une nouvelle session
        const nouvelleSession = new Sessions({
            formation,
            dateDebut,
            dateFin,
            lieu,
            capacite,
        });

        // Sauvegarder la session dans la base de données
        await nouvelleSession.save();

        // Mettre à jour la référence de session dans les formations associées
        await Formation.updateMany({ _id: { $in: formation } }, { $push: { sessions: nouvelleSession._id } });

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
        const { dateDebut, dateFin, lieu, formateur, capacite } = req.body;

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
        const resultat = await Sessions.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: 'Session non trouvée.' });
        }

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

module.exports = {
    creerSession,
    afficherSessions,
    updateSession,
    deleteSessionById,
    afficherDetailsSession,
    
};
