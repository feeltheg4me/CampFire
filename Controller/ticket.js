var Ticket = require("../Model/ticket")


async function add(req, res, next) {
  try{
  const ticket= new Ticket(req.body);
  await ticket.save();
  res.status(200).send('add ticket sucess');
    }catch(err){
  console.log(err);
    }
  
  }
  async function afficher(req, res, next) {
    try {
      const ticket = await Ticket.find();
      res.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des ticket');
    }
  }

 

  


  module.exports = {add,afficher}