var mongo=require("mongoose");
const schema= mongo.Schema;

const Ticket =new schema({
    type:String,
   
});
module.exports= mongo.model("ticket",Ticket); 




