// routes/document.js
const express = require('express');
const router = express.Router();
const { ajoutDocument,updateDocumentPublication,getDocuments,supprimerDocument,telechargement,modifierDocument,getDocumentAdmin} = require('../controller/documentController');
const multer = require('multer');

const upload = multer({ dest: 'fichier/' });

router.post('/ajoutDocument', upload.single('file'), ajoutDocument);
router.get('/getDocumentAdmin', getDocumentAdmin);
router.get('/getDocuments', getDocuments);
router.get('/telechargement/:id', telechargement);
router.put('/modifierDocument/:id', modifierDocument);
router.delete('/supprimerDocument/:id', supprimerDocument);
router.put('/updateDocumentPublication/:id', updateDocumentPublication);


module.exports = router;
