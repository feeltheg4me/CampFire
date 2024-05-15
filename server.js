const http = require("http");
const express = require("express");
const path = require("path")

const evenement = require("./Routes/evenement.js");
const{add1} = require("./Controller/evenement.js");

const user = require("./Routes/userRoute.js");
const{add2} = require("./Controller/userController.js");


const annonceOffre = require("./Routes/annonceOffre.js");
const{add3} = require("./Controller/AnnonceOffre.js");

const reclamation = require("./Routes/reclamation.js");
const{add4} = require("./Controller/Reclamation.js");

var mongo=require('mongoose');  //création data base mongodb
var mongoconnect=require("./config/dbConnection.json");   //l'emplacement de fichiers
const bodyParser = require("body-parser");

mongo.connect(mongoconnect.url,{
  useNewUrlParser:true,     //affichage a partir de BD (parser URl)
  useUnifiedTopology:true      //acceder a la BD a partir de topologie exacte
})
.then(()=>console.log('mongo connected'))
.catch((err)=>console.log(err));


var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use("/annonceOffre",annonceOffre);
app.use("/evenement",evenement);
app.use("/reclamation",reclamation);
app.use("/user",user);
const server = http.createServer(app);


server.listen(3000, console.log("server run"));


