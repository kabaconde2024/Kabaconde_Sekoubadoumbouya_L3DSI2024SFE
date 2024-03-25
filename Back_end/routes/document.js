// routes/document.js
const express = require('express');
const router = express.Router();
const { ajoutDocument,getDocuments,telechargement,updateDocumentPublication,getDocumentAdmin} = require('../controller/documentController');
const multer = require('multer');

const upload = multer({ dest: 'fichier/' });

router.post('/ajoutDocument', upload.single('file'), ajoutDocument);
router.get('/getDocumentAdmin', getDocumentAdmin);
router.get('/getDocuments', getDocuments);
router.get('/telechargement/:id', telechargement);
router.put('/updateDocumentPublication/:id', updateDocumentPublication);

module.exports = router;
