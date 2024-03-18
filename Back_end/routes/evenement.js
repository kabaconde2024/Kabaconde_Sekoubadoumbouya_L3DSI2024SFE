const express = require('express');
const router = express.Router();
const multer = require('multer');

const Evenement = require('../model/Evenement');
const { ajouterEvenement, recupererEvenements } = require('../controller/EvenementController');

// Configuration de Multer pour enregistrer les fichiers dans un dossier spécifique avec un nom unique
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'events/'); // Dossier dans lequel les images seront enregistrées
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nom de fichier unique
    },
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage: storage });

router.post('/ajouterEvenement', upload.single('file'), ajouterEvenement);
router.get('/recupererEvenements', recupererEvenements);

module.exports = router;
