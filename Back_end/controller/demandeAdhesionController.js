const DemandeAdhesion = require('../model/DemandeAdhesion');
const User = require('../model/User');
const mongoose=require("mongoose");

// Contrôleur pour récupérer les messages
const getMessages = async (req, res) => {
  try {
    // Récupérer les données de la demande d'adhésion depuis la base de données
    const demande = await DemandeAdhesion.findOne();

    // Vérifier si une demande d'adhésion existe
    if (!demande) {
      return res.status(404).json({ success: false, message: 'Aucune demande d\'adhésion trouvée.' });
    }

    // Extraire les messages de la demande d'adhésion
    const { messageInitial, messageEnvoi } = demande;

    // Envoyer les messages récupérés en réponse
    res.status(200).json({ success: true, messageInitial, messageEnvoi });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages de demande d\'adhésion :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des messages.' });
  }
};
const ajout = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Vérifiez si userId est une chaîne de caractères représentant un ObjectID valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'ID utilisateur invalide.' });
      }
  
      // Récupérer le nom de l'utilisateur associé à l'ID
      const user = await User.findById(userId);
      const username = user.username;
  
      // Ajouter l'ID de l'utilisateur à la collection "demande" ou effectuer toute autre logique nécessaire
      // Exemple avec MongoDB :
      const demande = await DemandeAdhesion.create({ user: userId });
  
      // Informer l'admin de la demande avec le nom de l'utilisateur
      // Vous pouvez utiliser des websockets, envoyer un email à l'admin, ou stocker les demandes dans une collection "notifications" dans la base de données
      // Pour l'instant, renvoyons simplement le nom de l'utilisateur dans la réponse
      res.status(200).json({ success: true, message: `Demande de ${username} traitée avec succès.`, demande });
    } catch (error) {
      console.error('Erreur lors du traitement de la demande :', error);
      res.status(500).json({ success: false, message: 'Erreur lors du traitement de la demande.' });
    }
  };

module.exports = { getMessages,ajout };
