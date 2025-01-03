const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
const Formation = require('../model/Formation');
const Session = require('../model/Session');
const User  = require('../model/User');

 // Assurez-vous que vous importez correctement le modèle "Formation"
const Participation = require('../model/Participation');



const ajouterparticiaption = async (req, res) => {
    try {
        console.log('Requête POST reçue sur /participations', req.body);

        const { user, session } = req.body;

        console.log('UserID et FormationID extraits de la requête :', user, session);

        // Vérifiez si userId est défini
        if (!user) {
            console.log('ID d\'utilisateur manquant dans la requête.');
            return res.status(400).json({ message: 'ID d\'utilisateur manquant dans la requête.' });
        }

        // Vérifiez si l'utilisateur a déjà participé à cette formation
        const existingParticipation = await Participation.findOne({ user, session });

        if (existingParticipation) {
            console.log('L\'utilisateur a déjà participé à cette formation.');
            return res.status(400).json({ message: 'L\'utilisateur a déjà participé à cette formation.' });
        }

        // Créez une nouvelle participation
        const newParticipation = new Participation({ user, session });

        // Enregistrez la participation dans la base de données
        const savedParticipation = await newParticipation.save();

        console.log('Participation enregistrée avec succès :', savedParticipation);

        res.json(savedParticipation);
    } catch (error) {
        console.error('Erreur lors de la gestion de la requête POST /participations :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la requête.' });
    }
};

const countParticipation = async (req, res) => {
    try {
      // Compter toutes les participations dans la base de données
      const count = await Participation.countDocuments();
  
      res.status(200).json({ count });
    } catch (error) {
      console.error('Erreur lors du comptage des participations :', error.message);
      res.status(500).json({ message: 'Erreur lors du comptage des participations.' });
    }
  };

  

  const afficherparticipation = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('ID de l\'utilisateur dans la requête :', userId);

        // Recherchez les participations de l'utilisateur dans la collection Participation
        const userParticipations = await Participation.find({ user: userId }).populate('user').populate('session');

        // Créez un tableau pour stocker les détails des sessions
        let sessionDetails = [];

        // Pour chaque participation de l'utilisateur, ajoutez les détails de la session au tableau
        for (let participation of userParticipations) {
            sessionDetails.push({
                username: participation.user.username,
                titre: participation.session.titre,
                prix: participation.session.prix,
                capacite: participation.session.capacite,
                lieu: participation.session.lieu,

                // Ajoutez d'autres détails de session si nécessaire
            });
        }

        console.log('Détails des sessions auxquelles l\'utilisateur est inscrit :', sessionDetails);

        res.json(sessionDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des sessions auxquelles l\'utilisateur est inscrit :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des sessions auxquelles l\'utilisateur est inscrit.' });
    }
};

const afficherToutesParticipations = async (req, res) => {
    try {
        // Recherchez toutes les participations dans la collection Participation
        const participations = await Participation.find()
            .populate('session') // Populate les détails de chaque session
            .populate('user'); // Populate les détails de l'utilisateur associé à chaque participation

        // Envoyez les participations trouvées en réponse
        res.json(participations);
    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les participations :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de toutes les participations.' });
    }
};


const updatedParticipation = async (req, res) => {
    const { id } = req.params;
    const { etat } = req.body;
    console.log('Nouvel état reçu dans la requête :', etat);


    try {
        console.log('ID de la participation à mettre à jour :', id);
        console.log('Nouvel état reçu dans la requête :', etat);

        const updatedParticipation = await Participation.findOneAndUpdate(
            { _id: id },
            { $set: { etat: etat } },
            { new: true } // Renvoie la participation mise à jour
        );

        console.log('Participation mise à jour :', updatedParticipation);

        if (!updatedParticipation) {
            console.log('Participation non trouvée.');
            return res.status(404).json({ message: 'Participation not found' });
        }

        // Répondre avec la participation mise à jour
        res.json(updatedParticipation);
    } catch (error) {
        console.error('Error updating participation state:', error);
        res.status(500).json({ message: 'An error occurred while updating participation state' });
    }
};

const countParticipants = async (req, res) => {
    try {
        const sessionId = req.params.sessionId; // Supposons que l'ID de la session soit passé en tant que paramètre d'URL
        // Utilisez countDocuments() pour compter les participations à la session spécifiée
        const participantsCount = await Participation.countDocuments({ session: sessionId });
        res.status(200).json({ count: participantsCount }); // Envoyer la réponse avec le nombre de participants
    } catch (error) {
        console.error('Erreur lors du comptage des participants :', error);
        res.status(500).json({ error: 'Erreur lors du comptage des participants' }); // Envoyer une réponse d'erreur en cas d'erreur
    }
}


module.exports = { countParticipants,countParticipation,afficherparticipation ,ajouterparticiaption,afficherToutesParticipations,updatedParticipation};