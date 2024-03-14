const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Base', { useNewUrlParser: true, useUnifiedTopology: true });

//partie image 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Dossier dans lequel les images seront enregistrées
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Nom de fichier unique
    },
  });
  
  const upload = multer({ storage });
  
  // Middleware pour permettre les requêtes CORS (à adapter selon votre configuration)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use('/uploads', express.static('uploads'));

  

app.use('/api/auth', require('./routes/auth'));
app.use('/api/adherent', require('./routes/adherent'));
app.use('/api/formation', require('./routes/formation'));
app.use('/api/adhesion', require('./routes/adhesion'));
app.use('/api/participation', require('./routes/participations'));
app.use('/api/session', require('./routes/sessions'));
app.use('/api/documents', require('./routes/document'));



app.post('/api/images/uploadImage/:userId', upload.single('image'), (req, res) => {
    try {
      // Le fichier est enregistré avec succès, vous pouvez faire quelque chose avec req.file
      console.log('Image téléchargée avec succès:', req.file);

      // Construisez l'URL complète de l'image sur votre serveur
      const imageURL = `http://localhost:5000/uploads/${req.file.filename}`;

      res.status(200).json({ message: 'Image téléchargée avec succès', imageURL });
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      res.status(500).json({ error: 'Erreur lors du téléchargement de l\'image' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});