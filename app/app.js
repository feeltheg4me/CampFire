// const http = require("http");
// const express = require("express");
// const mongoose = require("mongoose");
// const mongoConnection = require("./config/dbconnection.json");
// const bodyParser = require("body-parser");


// mongoose.connect(mongoConnection.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Mongo connecté')).catch((err) => console.log(err));


// const userRouter = require("./Routes/userRoute");
// const evenementRouter = require("./Routes/evenement");


// const app = express();


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// app.use("/user", userRouter);
// app.use("/evenement", evenementRouter);


// const server = http.createServer(app);
// server.listen(3000, () => console.log("Serveur en cours d'exécution sur le port 3000"));


// module.exports = app;