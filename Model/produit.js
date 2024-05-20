var mongo=require("mongoose");
const schema= mongo.Schema;

const produit =new schema({
    idProduit :Number,
    nomProduit :String,
    description :String,
    prix :Number,
    image :String
    });
module.exports= mongo.model("produit",produit);