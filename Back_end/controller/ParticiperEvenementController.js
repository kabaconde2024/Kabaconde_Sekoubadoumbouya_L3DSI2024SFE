const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
const Evenement = require('../model/Evenement');
const User  = require('../model/User');
const ParticiperEvenement = require('../model/ParticiperEvenement');

const ajouterparticiperEvenement = async (req, res) => {
    try {
        console.log('Requête POST reçue sur /participations', req.body);

        const { user, evenement, date } = req.body;

        console.log('UserID et FormationID extraits de la requête :', user, evenement, date);

        // Vérifiez si userId est défini
        if (!user) {
            console.log('ID d\'utilisateur manquant dans la requête.');
            return res.status(400).json({ message: 'ID d\'utilisateur manquant dans la requête.' });
        }

        // Vérifiez si l'utilisateur a déjà participé à cet evenement
        const existingParticipation = await ParticiperEvenement.findOne({ user, evenement });

        if (existingParticipation) {
            console.log('L\'utilisateur a déjà participé à cet evenement');
            return res.status(400).json({ message: 'L\'utilisateur a déjà participé à cet evenement.' });
        }

        // Créez une nouvelle participation
        const newParticipation = new ParticiperEvenement({ user, evenement, date });

        // Enregistrez la participation dans la base de données
        const savedParticipation = await newParticipation.save();

        console.log('Participation à l\'événement enregistrée avec succès :', savedParticipation);

        res.json(savedParticipation);
    } catch (error) {
        console.error('Erreur lors de la gestion de la requête POST /participations :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la requête.' });
    }
};


const afficherparticiperEvenement = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('ID de l\'utilisateur dans la requête :', userId);

        // Recherchez les participations de l'utilisateur dans la collection Participation
        const userParticipations = await ParticiperEvenement.find({ user: userId });

        // Créez un tableau pour stocker les détails des sessions
        let evenementDetails = [];

        // Pour chaque participation de l'utilisateur, recherchez les détails de la session
        for (let participation of userParticipations) {
            // Recherchez les détails de la session à partir de l'identifiant de session
            const evenement = await Evenement.findById(participation.evenement);
            // Si la session est trouvée, ajoutez ses détails au tableau
            if (evenement) {
                evenementDetails.push(evenement);
            }
        }

        console.log('Détails des evenements auxquelles l\'utilisateur est inscrit :', evenementDetails);

        res.json(evenementDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des evenements auxquelles l\'utilisateur est inscrit :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des evenements auxquelles l\'utilisateur est inscrit.' });
    }
};

const participerEvenementuser= async (req, res) => {
    try {
        const { userId, evenementId } = req.params;

        // Recherchez si l'utilisateur a déjà participé à cet événement
        const existingParticipation = await ParticiperEvenement.findOne({ user: userId, evenement: evenementId });

        // Renvoyer true si l'utilisateur a déjà participé, sinon false
        res.json({ hasParticipated: !!existingParticipation });
    } catch (error) {
        console.error('Erreur lors de la vérification de la participation de l\'utilisateur:', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la vérification de la participation.' });
    }
}

const supprimerParticipation = async (req, res) => {
    try {
        const { userId, evenementId } = req.params;
        
        // Vérifiez si la participation existe
        const participation = await ParticiperEvenement.findOne({ user: userId, evenement: evenementId });
        if (!participation) {
            return res.status(404).json({ message: 'Participation non trouvée.' });
        }
        
        // Supprimez la participation
        await ParticiperEvenement.deleteOne({ _id: participation._id });
        
        console.log(`Participation de l'utilisateur ${userId} à l'événement ${evenementId} supprimée avec succès.`);
        res.json({ message: 'Participation supprimée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la participation:', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la participation.' });
    }
};

const recupererParticipation = async (req, res) => {
    try {
        const participations = await ParticiperEvenement.find()
            .populate('user') // Récupère les informations des utilisateurs
            .populate('evenement') // Récupère les informations des événements
            .exec();
        res.json(participations); // Envoie les participations en réponse JSON
    } catch (error) {
        console.error("Erreur lors de la récupération des participations:", error);
        res.status(500).json({ error: 'Erreur lors de la récupération des participations' });
    }
};



module.exports = { ajouterparticiperEvenement,recupererParticipation,supprimerParticipation,afficherparticiperEvenement,participerEvenementuser};
