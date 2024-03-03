const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Base', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/adherent', require('./routes/adherent'));
app.use('/api/formation', require('./routes/formation'));
app.use('/api/adhesion', require('./routes/adhesion'));
app.use('/api/participation', require('./routes/participations'));
app.use('/api/session', require('./routes/sessions'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});