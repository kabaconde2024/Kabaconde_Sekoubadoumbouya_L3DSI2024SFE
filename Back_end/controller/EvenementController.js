const express = require('express');
const Evenement = require('../model/Evenement');
const path = require('path');
const fs = require('fs');

const ajouterEvenement = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
        }

        // Générer un nom de fichier unique
        const fileName = `${Date.now()}_${req.file.originalname}`;

        // Utilisez le nom généré pour stocker le fichier dans le dossier
        const filePath = path.join(__dirname, '..', 'events', fileName); // Utilisation de path.join pour définir le chemin du fichier
        await fs.promises.rename(req.file.path, filePath); // Utilisation de req.file.path pour obtenir le chemin du fichier téléchargé

        // Enregistrez l'événement dans la base de données avec le nom du fichier généré
        const nouvelEvenement = new Evenement({
            titre: req.body.titre,
            datePub: req.body.datePub,
            description: req.body.description,
            image: fileName,
        });

        const savedEvent = await nouvelEvenement.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'événement :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'événement.' });
    }
};

const recupererEvenements = async (req, res) => {
    try {
        const tousLesEvenements = await Evenement.find();

        // Envoyer les événements récupérés en réponse
        res.status(200).json(tousLesEvenements);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    }
};

module.exports = {
    ajouterEvenement,
    recupererEvenements,
};
