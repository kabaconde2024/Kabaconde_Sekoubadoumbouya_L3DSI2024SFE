
const express = require('express');
const router = express.Router();

const {EffectuerComentaires} = require('../controller/CommentairesController');
router.post('/EffectuerComentaires', EffectuerComentaires);
module.exports = router;



