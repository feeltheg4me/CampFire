const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConnection.json');
const Role = require('./Model/role');
const passport = require('passport');
const session = require('express-session');
require('./config/passport');
const path = require('path');
require('dotenv').config(); 

// Import routes
const evenementRoutes = require('./Routes/evenement.js');
const userRoutes = require('./Routes/userRoute.js');
const authRoutes = require('./Routes/auth.routes.js');
const annonceOffreRoutes = require('./Routes/annonceOffre.js');
const reclamationRoutes = require('./Routes/reclamation.js');
require('./config/passport');

const app = express();

//Oauth google
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'FrontEnd/assets')));
app.use(express.static(path.join(__dirname, 'FrontEnd/Views')));
app.use(express.static(path.join(__dirname, 'FrontEnd', 'assets')));

// Register routes
app.use('/annonceOffre', annonceOffreRoutes);
app.use('/evenement', evenementRoutes);
app.use('/reclamation', reclamationRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Create server
const server = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    initial();
  })
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initial function to set up roles
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: 'acheteur' }).save();
      console.log("Added 'acheteur' to roles collection");

      await new Role({ name: 'vendeur' }).save();
      console.log("Added 'vendeur' to roles collection");

      await new Role({ name: 'admin' }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (err) {
    console.error('Error initializing roles:', err);
  }
}
