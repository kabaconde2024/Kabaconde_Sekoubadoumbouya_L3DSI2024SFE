const Document = require('../model/Publication');
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
      type: req.body.type // Ajout du type du document

    });

    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du document :', error.message);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du document.' });
  }
};

const countPublishedDocuments = async (req, res) => {
  try {
    // Compter tous les documents depuis la base de données où publication est true
    const count = await Document.countDocuments({ publication: true });

    res.status(200).json({ count });
  } catch (error) {
    console.error('Erreur lors du comptage des documents publiés :', error.message);
    res.status(500).json({ message: 'Erreur lors du comptage des documents publiés.' });
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



      const modifierDocument = async (req, res) => {
        const { id } = req.params;

        try {
          // Vérifiez si l'ID est valide
          if (!id) {
            return res.status(400).json({ message: 'ID d\'événement invalide.' });
          }

          // Vérifiez si l'événement existe
          const documents = await Document.findById(id);
          if (!documents) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
          }
          
          // Mettre à jour les champs de l'événement
          documents.date = req.body.date || documents.date;
          documents.description = req.body.description || documents.description;
          documents.publication = req.body.publication || documents.publication; // Vérifiez si req.file est défini

          // Enregistrer les modifications dans la base de données
          await documents.save();

          // Répondre avec succès
          res.status(200).json({ message: 'Événement modifié avec succès.' });
        } catch (error) {
          console.error('Erreur lors de la modification de l\'événement :', error);
          res.status(500).json({ message: 'Une erreur est survenue lors de la modification de l\'événement.' });
        }
      };


const supprimerDocument = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifiez si l'ID est valide
    if (!id) {
      return res.status(400).json({ message: 'ID d\'événement invalide.' });
    }

    // Supprimez l'événement de la base de données
    const result = await Document.deleteOne({ _id: id });

    // Vérifiez si l'événement a été supprimé avec succès
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Document non trouvé.' });
    }

    // Répondre avec succès
    res.status(200).json({ message: 'Document supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'événement.' });
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


module.exports = { ajoutDocument, countPublishedDocuments ,updateDocumentPublication,supprimerDocument,getDocuments, telechargement,getDocumentAdmin,modifierDocument };
