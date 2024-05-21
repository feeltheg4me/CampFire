var mongo = require("mongoose");
const schema = mongo.Schema;

const EvenementSchema = new schema({
  idEvent: Number,
  lieu: String,
  date: Date,
  idUtilisateur: Number,
  nbreParticipants: Number,
  latitude: Number,
  longitude: Number,
  ticket: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: "ticket"
    }
  ]
});

module.exports = mongo.model("evenement", EvenementSchema);
