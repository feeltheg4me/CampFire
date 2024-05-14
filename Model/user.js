var mongo=require("mongoose");
const schema= mongo.Schema;

const User =new schema({
    idUser:Number,
    email:String,
    password:Date,
    nom:String,
    prenom:String,
    role:String
});
module.exports= mongo.model("user",User); 




