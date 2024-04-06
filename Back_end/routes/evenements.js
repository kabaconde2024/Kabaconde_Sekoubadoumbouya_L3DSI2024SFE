const express = require('express');
const router = express.Router();
const { ajoutEvenement, getEvenement,supprimerEvenement,modifierEvenement } = require('../controller/EvenementController');

const multer = require('multer');

// Configuration de multer pour stocker les fichiers téléchargés dans le dossier "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Evenements/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/ajoutEvenement', upload.single('image'), ajoutEvenement);
router.get('/getEvenement', getEvenement);
router.delete('/supprimerEvenement/:id', supprimerEvenement);
router.put('/modifierEvenement/:id', modifierEvenement); // Route pour la modification



module.exports = router;
