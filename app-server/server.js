const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const PORT = process.env.PORT || 3001;
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')))


// Controllers
const userCtrl = require('./controllers/userCtrl');

// Routes
app.post('/sign-up', userCtrl.postSignUp);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});


// Server
app.listen(PORT, () => {
  console.log(`App is up on port ${PORT}`);
});
