const http = require("http");
const express = require("express");
const path = require("path")
const evenement = require("./Routes/evenement.js");
const ticket = require("./Routes/ticket.js")
const{add} = require("./Controller/evenement.js");

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
app.use("/evenement",evenement);
app.use("/ticket",ticket);
const server = http.createServer(app);


server.listen(3000, console.log("server run"));


