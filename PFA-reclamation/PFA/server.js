const http = require("http");
const express = require("express");
const reclamationRoutes = require("./Routes/reclamation.js");
const discountRoutes = require("./Routes/discount.js"); // Add discount routes
const productRoutes = require("./Routes/product.js"); // Add product routes
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'dbConnection.json'), 'utf8'));

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(cors()); // Use the cors middleware
app.use('/uploads', express.static('uploads'));

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Make upload middleware available
app.use(upload.single('picture'));
app.use("/reclamation", reclamationRoutes);
app.use("/discount", discountRoutes); // Add discount routes
app.use("/product", productRoutes); // Add product routes

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('Server error:', error);
  }
});
