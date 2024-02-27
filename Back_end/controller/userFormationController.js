const UserFormation = require('../model/UserFormation');

const ajouterUserFormation = async (req, res) => {
    const { idUtilisateur, idFormation, titreFormation } = req.body;

    // Vérifier si toutes les données nécessaires sont fournies
    if (!idUtilisateur || !idFormation || !titreFormation) {
        return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires pour ajouter une nouvelle formation utilisateur.' });
    }

    try {
        // Créer une nouvelle formation utilisateur
        const userFormation = new UserFormation({
            idUtilisateur,
            idFormation,
            titreFormation
        });

        // Enregistrer la nouvelle formation utilisateur dans la base de données
        const newUserFormation = await userFormation.save();

        // Répondre avec la nouvelle formation utilisateur créée
        res.status(201).json(newUserFormation);
    } catch (error) {
        // Gérer les erreurs lors de l'ajout de la formation utilisateur
        console.error('Erreur lors de l\'ajout de la formation utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la formation utilisateur.' });
    }
};

const getUserFormations = async (req, res) => {
    try {
        // Récupérer toutes les formations utilisateur depuis la base de données
        const userFormations = await UserFormation.find();

        // Répondre avec toutes les formations utilisateur
        res.status(200).json(userFormations);
    } catch (error) {
        // Gérer les erreurs lors de la récupération des formations utilisateur
        console.error('Erreur lors de la récupération des formations utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération des formations utilisateur.' });
    }
};

module.exports = {
    ajouterUserFormation,
    getUserFormations
};
