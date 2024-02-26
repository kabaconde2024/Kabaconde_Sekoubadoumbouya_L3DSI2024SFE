const UserFormation = require('../model/UserFormation');


const ajouterUserFormation = async (req, res) => {
    const { idUtilisateur, idFormation, titreFormation } = req.body;

    try {
        const userFormation = new UserFormation({
            idUtilisateur,
            idFormation,
            titreFormation
        });

        const newUserFormation = await userFormation.save();
        res.status(201).json(newUserFormation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getUserFormations = async (req, res) => {
    try {
        // Utilisez la méthode find() du modèle UserFormation pour récupérer toutes les formations d'utilisateur
        const userFormations = await UserFormation.find();
        res.status(200).json(userFormations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    ajouterUserFormation,
    getUserFormations
};
