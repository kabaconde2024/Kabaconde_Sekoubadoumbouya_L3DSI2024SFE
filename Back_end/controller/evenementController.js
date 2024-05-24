const Evenement = require('../model/Evenement');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ajoutEvenement = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);

    // Récupérez les données du corps de la requête
    const eventData = req.body;

    // Vérifiez si le fichier image a bien été téléchargé
    if (!req.file) {
      console.log("Image non téléchargée");
      return res.status(400).json({ message: 'Veuillez télécharger une image.' });
    }

    // Ajoutez le nom du fichier d'image aux données
    eventData.image = req.file.filename;

    // Créez une nouvelle instance de modèle avec les données
    const newEvenement = new Evenement(eventData);

    // Validation du modèle MongoDB
    const validationError = newEvenement.validateSync();

    if (validationError) {
      console.log("Erreur de validation :", validationError.message);
      return res.status(400).json({ message: validationError.message });
    }

    // Enregistrez l'événement dans la base de données
    const savedEvenement = await newEvenement.save();
    console.log("Événement enregistré :", savedEvenement);

    res.json(savedEvenement);
  } catch (error) {
    console.error("Erreur lors du traitement :", error);
    res.status(500).json({ message: error.message });
  }
};


const getEvenement = async (req, res) => {
    try {
      // Récupérez la liste des événements
      const evenements = await Evenement.find({ archive: false });
      res.json(evenements);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des événements.' });
    }
  };

  const supprimerEvenement = async (req, res) => {
    const { id } = req.params;

  try {
    // Vérifiez si l'ID est valide
    if (!id) {
      return res.status(400).json({ message: "ID d'événement invalide." });
    }

    // Mettez à jour le champ 'archive' à true
    const result = await Evenement.updateOne({ _id: id }, { $set: { archive: true } });

    // Vérifiez si l'événement a été mis à jour avec succès
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }

    // Répondre avec succès
    res.status(200).json({ message: "Événement archivé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'archivage de l'événement :", error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'archivage de l'événement." });
  }
  };

  
  const modifierEvenement = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Vérifiez si l'ID est valide
      if (!id) {
        return res.status(400).json({ message: 'ID d\'événement invalide.' });
      }
  
      // Vérifiez si l'événement existe
      const evenement = await Evenement.findById(id);
      if (!evenement) {
        return res.status(404).json({ message: 'Événement non trouvé.' });
      }
  
      // Mettre à jour les champs de l'événement
      evenement.titre = req.body.titre || evenement.titre;
      evenement.description = req.body.description || evenement.description;
      evenement.date = req.body.date || evenement.date;
      evenement.image = req.file ? req.file.filename : evenement.image; // Vérifiez si req.file est défini
  
      // Enregistrer les modifications dans la base de données
      await evenement.save();
  
      // Répondre avec succès
      res.status(200).json({ message: 'Événement modifié avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la modification de l\'événement :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la modification de l\'événement.' });
    }
  };
  
  
module.exports = { ajoutEvenement,getEvenement,supprimerEvenement,modifierEvenement };