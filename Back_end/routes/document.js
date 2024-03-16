// routes/document.js
const express = require('express');
const router = express.Router();
const { ajoutDocument,getDocuments,telechargement} = require('../controller/documentController');
const multer = require('multer');

const upload = multer({ dest: 'fichier/' });

router.post('/ajoutDocument', upload.single('file'), ajoutDocument);
router.get('/getDocuments', getDocuments);
router.get('/telechargement/:id', telechargement);
module.exports = router;
