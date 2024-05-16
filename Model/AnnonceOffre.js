var mongo=require("mongoose");
const schema= mongo.Schema;

const AnnonceOffre =new schema({
   
idAnnonce :Number,
dateDebutAnnonce :Date,
dateFinAnnonce : Date,
description : String,
prix : Number,
image :String

});
module.exports= mongo.model("annonceOffre",AnnonceOffre); 




