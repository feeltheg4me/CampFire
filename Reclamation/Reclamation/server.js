const http = require("http");
const express = require("express");
const reclamationRoutes = require("./Routes/reclamation.js");
const mongoose = require('mongoose');
const dbConfig = require("./config/dbConnection.json");
const bodyParser = require("body-parser");

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/reclamation", reclamationRoutes);

const server = http.createServer(app);
server.listen(3000, () => console.log("Server running on port 3000"));