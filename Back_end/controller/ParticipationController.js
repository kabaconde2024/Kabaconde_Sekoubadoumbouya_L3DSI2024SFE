const express = require('express');

const Formation = require('../model/Formation');
 // Assurez-vous que vous importez correctement le modèle "Formation"
const Participation = require('../model/Participation');



const ajouterparticiaption = async (req, res) => {
    try {
        console.log('Requête POST reçue sur /participations', req.body);

        const { userId, formationId } = req.body;

        console.log('UserID et FormationID extraits de la requête :', userId, formationId);

        // Vérifiez si userId est défini
        if (!userId) {
            console.log('ID d\'utilisateur manquant dans la requête.');
            return res.status(400).json({ message: 'ID d\'utilisateur manquant dans la requête.' });
        }

        // Vérifiez si l'utilisateur a déjà participé à cette formation
        const existingParticipation = await Participation.findOne({ user: userId, formation: formationId });

        if (existingParticipation) {
            console.log('L\'utilisateur a déjà participé à cette formation.');
            return res.status(400).json({ message: 'L\'utilisateur a déjà participé à cette formation.' });
        }

        // Créez une nouvelle participation
        const newParticipation = new Participation({ user: userId, formation: formationId });

        // Enregistrez la participation dans la base de données
        const savedParticipation = await newParticipation.save();

        console.log('Participation enregistrée avec succès :', savedParticipation);

        res.json(savedParticipation);
    } catch (error) {
        console.error('Erreur lors de la gestion de la requête POST /participations :', error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la requête.' });
    }
};

const afficherparticipation = async (req, res) => {

    try {

        const userId = req.params.id     
           console.log('ID de l\'utilisateur dans la requête :', userId);
        const userFormations = await Participation.find({ user: userId }).populate('formation');
        console.log('Participation de l\'utilisateur :', userFormations);
        

        res.json(userFormations);
    } catch (error) {
        console.error('Erreur lors de la récupération des formations de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des formations de l\'utilisateur.' });
    }
};




module.exports = { afficherparticipation ,ajouterparticiaption};