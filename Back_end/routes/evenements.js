const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { ajoutEvenement, getEvenement,supprimerEvenement,modifierEvenement } = require('../controller/EvenementController');
=======
const { ajoutEvenement, getEvenement,supprimerEvenement,modifierEvenement } = require('../controller/evenementController');
>>>>>>> 3a76e27eebbae7bf9d2699f72b8b22dfdae4fa03
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


<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 3a76e27eebbae7bf9d2699f72b8b22dfdae4fa03
