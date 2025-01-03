const express = require('express');
const router = express.Router();
const Formation = require('../model/Formation');
const User = require('../model/User');
const Session = require('../model/Session');


// Méthode pour créer une nouvelle formation
const creerFormation = async (req, res) => {
    try {

        const { titre, description, duree } = req.body;

        // Vérifier si la formation existe déjà
        const existingFormation = await Formation.findOne({ titre });

        if (existingFormation) {
            return res.status(400).json({ message: 'Cette formation existe déjà.' });
        }

        // Créer une nouvelle formation
        const nouvelleFormation = new Formation({
            titre,
            description,
            duree,
            
        });

        // Sauvegarder la formation dans la base de données
        await nouvelleFormation.save();

        res.status(201).json({ message: 'Formation créée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la formation.' });
    }
};

const getAllSessionsForFormation = async (req, res) => {
    try {
        const id = req.params.id;
  
        // Trouver la formation par son ID et populer le champ 'sessions' pour récupérer toutes les sessions liées
        const formation = await Formation.findById(id).populate('sessions');

        if (!formation) {
            throw new Error('Formation non trouvée');
        }

        // Renvoyer les sessions récupérées en réponse
        res.json(formation.sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des sessions de la formation' });
    }
};

 
const afficher= async (req, res) => {
    try {
      const formationId = req.params.id;
  
      // Utilisez l'ID pour rechercher la formation dans la base de données
      const formation = await Formation.findById(formationId);
  
      // Vérifiez si la formation existe
      if (!formation) {
        return res.status(404).json({ message: 'Formation non trouvée.' });
      }
  
      // Renvoyez les détails de la formation
      res.json(formation);
    } catch (error) {
      // Gérez les erreurs
      console.error('Erreur lors de la récupération des détails de la formation :', error.message);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des détails de la formation.' });
    }
  };

const afficherFormations = async (req, res) => {
    try {
      // Récupérer toutes les formations de la base de données
      const toutesLesFormations = await Formation.find();
  
      // Envoyer les formations récupérées en réponse
      res.status(200).json(toutesLesFormations);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations :', error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
    }
  };

  const  Afficher=async(req,res)=>{
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) {
          return res.status(404).json({ message: 'Formation non trouvée' });
        }
        res.status(200).json({ formation });
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la formation :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des détails de la formation' });
      }
  }


  const afficherFormation = async (req, res) => {
    try {
        // Récupérer toutes les formations vérifiées de la base de données
        const formationsVerifiees = await Formation.find({ verifie: false });

        // Envoyer les formations vérifiées en réponse
        res.status(200).json(formationsVerifiees);
    } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
    }
};


  const updateFormation = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID à partir des paramètres de l'URL
        const { titre, description, duree } = req.body;

        // Vérifier si la formation existe
        const existingFormation = await Formation.findById(id);

        if (!existingFormation) {
            return res.status(404).json({ message: 'Formation non trouvée.' });
        }

        // Mettre à jour les propriétés de la formation
        existingFormation.titre = titre || existingFormation.titre;
        existingFormation.description = description || existingFormation.description;
        existingFormation.duree = duree || existingFormation.duree;

        // Sauvegarder les modifications dans la base de données
        await existingFormation.save();

        res.status(200).json({ message: 'Formation mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la formation.' });
    }
};
/*
const deleteFormationById = async (req, res) => {
    try {
        const resultat = await Formation.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: "Formation non trouvée." });
        }

        res.status(200).json({ message: 'Formation supprimée avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la suppression de la formation." });
    }
};
*/
const deleteFormationById = async (req, res) => {
    try {
        // Trouver la formation à supprimer
        const formation = await Formation.findOne({ _id: req.params.id });

        // Vérifier si la formation existe
        if (!formation) {
            return res.status(404).json({ message: "Formation non trouvée." });
        }

        // Supprimer toutes les sessions associées à la formation
        await Session.deleteMany({ _id: { $in: formation.sessions } });

        // Supprimer les références à la formation dans les sessions
        await Session.updateMany({ formation: req.params.id }, { $unset: { formation: 1 } });

        // Supprimer les références à la formation dans la collection User
        await User.updateMany({ sessionformateur: { $in: formation.sessions } }, { $pull: { sessionformateur: { $in: formation.sessions } } });

        // Supprimer la formation
        const resultat = await Formation.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: "Formation non trouvée." });
        }

        // Mise à jour des utilisateurs pour supprimer le rôle de formateur s'ils n'ont plus de sessions
        const userSessions = await Session.find({ userSession: { $in: formation.sessions } });
        for (const session of userSessions) {
            const user = await User.findOne({ _id: session.userSession });
            if (!user) continue;
        
            const userSessionsCount = await Session.countDocuments({ userSession: user._id });
            if (userSessionsCount === 0) {
                user.roles = user.roles.filter(role => role !== 'formateur');
                await user.save();
            }
        }

        res.status(200).json({ message: 'Formation supprimée avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la suppression de la formation." });
    }
};



const accepterFormation = async (req, res) => {
    try {
        const userId = req.body.userId;
        const formationId = req.body.formationId;

        // Vérifier si l'utilisateur a déjà cette formation
        const user = await User.findById(userId);
        if (user.formations.includes(formationId)) {
            return res.status(400).json({ error: 'L\'utilisateur a déjà cette formation.' });
        }

        // Mise à jour de l'utilisateur
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { 
                $addToSet: { roles: 'formateur' },
                $push: { formations: formationId }
            },
            { new: true }
        );

        console.log('Updated User:', updatedUser);

        res.json({ message: 'Adhésion acceptée avec succès', user: updatedUser });
    } catch (error) {
        console.error('Erreur lors de l\'acceptation de l\'adhésion :', error);
        res.status(500).json({ error: 'Erreur lors de l\'acceptation de l\'adhésion' });
    }
};

const formationsByFormateur = async (req, res) => {
    try {
        const formateurId = req.params.id;

        // Recherchez les formations attribuées à un formateur spécifique
        const formateur = await User.findOne({ _id: formateurId }).populate('formations');

        if (!formateur) {
            return res.status(404).json({ message: 'Aucune formation trouvée pour ce formateur.' });
        }

        res.status(200).json(formateur.formations);
    } catch (error) {
        console.error('Erreur lors de la récupération des formations par formateur :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des formations par formateur' });
    }
};

const recupererSessionsFormation = async (req, res) => {
    try {
        const formationId = req.params.formationId;

        // Recherchez la formation dans la base de données en utilisant son ID
        const formation = await Formation.findById(formationId).populate({
            path: 'sessions',
            populate: {

                path: 'user',
                model: 'User',

                path: 'userSession', // Nom du champ référençant l'utilisateur dans la session
                select: 'username', // Sélectionnez uniquement le nom d'utilisateur
 
            }
        });

        // Vérifiez si la formation existe
        if (!formation) {
            return res.status(404).json({ message: 'Formation non trouvée' });
        }

        // Récupérez les sessions de la formation avec les détails de l'utilisateur
        const sessionsFormation = formation.sessions;

        res.status(200).json({ sessionsFormation });
    } catch (error) {
        console.error('Erreur lors de la récupération des sessions de la formation :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des sessions de la formation' });
    }
};




module.exports = {
    creerFormation,
    afficherFormation,
    updateFormation,
    deleteFormationById,
    afficher,
    afficherFormations,
    accepterFormation,
    formationsByFormateur,
    recupererSessionsFormation,
    Afficher,
    getAllSessionsForFormation,

}
