const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const stripe = require('stripe')('sk_test_51OuEfcRuWErPhnDe00PMhcbxFWXVZOd950QjBWk8JxnG4Z9n9A1XUuiQ82MMbM2cXisvmer8mPMVWmy7ocGE9d2300tIundsmy');
const demandeAdehesion = require('./routes/demandeAdehesion');


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
  
// Configuration de multer pour stocker les fichiers téléchargés dans le dossier "uploads"
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Evenements/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload1 = multer({ storage1: storage1 });

  app.use('/Evenements', express.static('Evenements'));

  

app.use('/api/auth', require('./routes/auth'));
app.use('/api/adherent', require('./routes/adherent'));
app.use('/api/formation', require('./routes/formation'));
app.use('/api/adhesion', require('./routes/adhesion'));
app.use('/api/participation', require('./routes/participations'));
app.use('/api/session', require('./routes/sessions'));
app.use('/api/documents', require('./routes/document'));
app.use('/api/evenement', require('./routes/evenements'));
app.use('/api/payement', require('./routes/payement'));
app.use('/api/demandeAdehesion', require('./routes/demandeAdehesion'));
app.use('/api/depense', require('./routes/depense'));
app.use('/api/don', require('./routes/don'));








app.post('/api/images/uploadImage/:userId', upload.single('image'), (req, res) => {
    try {
      // Le fichier est enregistré avec succès, vous pouvez faire quelque chose avec req.file
      console.log('Image téléchargée avec succès:', req.file);
      console.log("Bienvenue dans la page server.js");
      // Construisez l'URL complète de l'image sur votre serveur
      const imageURL = `http://localhost:5000/uploads/${req.file.filename}`;

      res.status(200).json({ message: 'Image téléchargée avec succès', imageURL });
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      res.status(500).json({ error: 'Erreur lors du téléchargement de l\'image' });
    }
});



app.post('/create-payment-intent', async (req, res) => {
  const { amount, name } = req.body; // Ajout du champ 'name' pour récupérer le nom de la personne

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: `Payment from ${name}`, 
      // Utilisation du nom dans la description
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    res.status(500).send({ error: 'Une erreur est survenue lors du traitement du paiement.' });
  }
});

app.get('/payments', async (req, res) => {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 10 });
    const formattedPayments = payments.data.map(payment => {
      let name = null;
      if (payment.description !== null) { // Ajout de la condition pour vérifier si la description est différente de null
        name = payment.description.split('Payment from ')[1]; // Extraction du nom depuis la description
      }
      return { 
        amount: payment.amount, // Récupération du montant
        name, // Récupération du nom
      };
    }).filter(payment => payment.name !== null && payment.name !== 'undefined'); // Filtre pour ne garder que les paiements avec un nom non null et non undefined
    console.log('Liste des paiements:', formattedPayments);
    res.json(formattedPayments); // Envoyer les paiements en tant que réponse JSON avec le nom et le montant
  } catch (error) {
    console.error('Erreur lors de la récupération des paiements:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des paiements.' });
  }
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});