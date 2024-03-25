const Document = require('../model/Document');
const path = require('path');
const fs = require('fs');


const ajoutDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    // Générer un nom de fichier unique
    const fileName = `${Date.now()}_${req.file.originalname}`;

    // Utilisez le nom généré pour stocker le fichier dans le dossier
    const filePath = path.join('fichier', fileName);
    await fs.promises.rename(req.file.path, filePath);

    // Enregistrez le document dans la base de données avec le nom généré
    const newDocument = new Document({
      date: req.body.date,
      path: fileName,
      description: req.body.description,
    });

    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du document :', error.message);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du document.' });
  }
};

const getDocuments = async (req, res) => {
  try {
    // Récupérez tous les documents depuis la base de données où publication est true
    const documents = await Document.find({ publication: true });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des documents.' });
  }
};




const telechargement = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      console.log('Document non trouvé.');
      return res.status(404).json({ message: 'Document non trouvé.' });
    }

    const filePath = path.join('fichier', document.path);
    console.log('Chemin du fichier côté serveur :', filePath);

    // Récupérer l'extension du fichier
    const fileExtension = path.extname(document.path).toLowerCase();

    // Définir le type de contenu en fonction de l'extension
    let contentType = 'application/octet-stream';

    if (fileExtension === '.pdf') {
      contentType = 'application/pdf';
    } else if (fileExtension === '.png') {
      contentType = 'image/png';
    } // Ajoutez d'autres extensions au besoin

    res.type(contentType);
    res.download(filePath, document.path);  // Utilisation de res.download pour envoyer le fichier au client
  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error.message);
    res.status(500).json({ message: 'Erreur lors du téléchargement du document.' });
  }
};

const getDocumentAdmin = async (req, res) => {
  try {
    // Récupérez tous les documents depuis la base de données où publication est true
    const documents = await Document.find();

    res.status(200).json(documents);
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des documents.' });
  }
};

const updateDocumentPublication = async (req, res) => {
  try {
    const documentId = req.params.id;
    const { publication } = req.body;

    // Rechercher le document dans la base de données par son identifiant
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document non trouvé.' });
    }

    // Mettre à jour la propriété de publication du document
    document.publication = publication;

    // Sauvegarder les modifications dans la base de données
    const updatedDocument = await document.save();

    // Répondre avec le document mis à jour
    res.status(200).json({ message: 'Publication du document mise à jour.', document: updatedDocument });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la publication du document :', error.message);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la publication du document.' });
  }
};

module.exports = { ajoutDocument, getDocuments, telechargement,getDocumentAdmin,updateDocumentPublication };
