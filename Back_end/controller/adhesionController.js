const Adhesion = require('../model/Adhesion');
const Utilisateur = require('../model/User');

const ajout = async (req, res) => {
    try {
        const users = await Utilisateur.find({ adherent: null }).select('_id');
        console.log("Recherche de l'utilisateur par ID:", users);

        const userIds = users.map(user => user._id);
        console.log("Recherche de l'utilisateur par ID:", userIds);

        const adhesions = await Adhesion.find().select('utilisateur');
        console.log("Adhesion:", adhesions);

        const usersWithoutAdhesion = userIds.filter(userId => !adhesions.map(adhesion => adhesion.utilisateur.toString()).includes(userId.toString()));
        console.log("Utilisateurs sans adhésion:", usersWithoutAdhesion);

        for (const userId of usersWithoutAdhesion) {
            const newAdhesion = new Adhesion({
                utilisateur: userId,
                date: new Date(),
                prix: 0,
            });

            console.log("Nouvelle adhésion créée:", newAdhesion);

            await newAdhesion.save();

            console.log("Adhésion sauvegardée dans la base de données.");

            const utilisateur = await Utilisateur.findById(userId);
            utilisateur.adhesion = newAdhesion._id;

            // Recherche ou création du rôle "adherent"
            let roleAdherent = await Role.findOne({ nom: 'adherent' });
            console.log("Role Adherent créé :", roleAdherent);

            if (!roleAdherent) {
                // Créez le rôle "adherent" s'il n'existe pas
                roleAdherent = new Role({ nom: 'adherent' });
                await roleAdherent.save();
                console.log("Role Adherent créé :", roleAdherent);
            }

            // Ajoutez le rôle "adherent" aux rôles de l'utilisateur
            utilisateur.roles.push(roleAdherent._id);

            // Mettre à jour le rôle de l'utilisateur avec "adherent"
            await utilisateur.save();
            break;
        }

        res.status(200).json({ message: 'Adhésions créées avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};

module.exports = { ajout };
