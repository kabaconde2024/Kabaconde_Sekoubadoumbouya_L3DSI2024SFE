// routes/document.js
const express = require('express');
const router = express.Router();
const { ajoutDocument,getDocuments,telechargement,getBilan,getPlan,getAvis,getPv} = require('../controller/documentController');
const multer = require('multer');

const upload = multer({ dest: 'fichier/' });

router.post('/ajoutDocument', upload.single('file'), ajoutDocument);
router.get('/getDocuments', getDocuments);
router.get('/getBilan', getBilan);
router.get('/getPlan', getPlan);
router.get('/getAvis', getAvis);
router.get('/getPv', getPv);
router.get('/telechargement/:id', telechargement);
module.exports = router;
