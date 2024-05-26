// routes/document.js
const express = require('express');
const router = express.Router();
const { ajoutDocument,countPublishedDocuments,updateDocumentPublication,getDocuments,supprimerDocument,telechargement,modifierDocument,getDocumentAdmin} = require('../controller/publicationController');
const multer = require('multer');

const upload = multer({ dest: 'fichier/' });

router.post('/ajoutDocument', upload.single('file'), ajoutDocument);
router.get('/getDocumentAdmin', getDocumentAdmin);
router.get('/getDocuments', getDocuments);
router.get('/telechargement/:id', telechargement);
router.put('/modifierDocument/:id', modifierDocument);
router.delete('/supprimerDocument/:id', supprimerDocument);
router.put('/updateDocumentPublication/:id', updateDocumentPublication);
router.get('/countPublishedDocuments', countPublishedDocuments);


module.exports = router;
