const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const reclamationSchema = new mongoose.Schema({
  idReclamation: { type: Number, unique: true },
  date: { type: Date, required: true },
  titre: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  nbreCommande: { type: Number, required: true },
  picture: { type: String } // Field for storing image URL or path
});

// Apply the auto-increment plugin to the schema
reclamationSchema.plugin(AutoIncrement, { inc_field: 'idReclamation' });


module.exports = mongoose.model("Reclamation", reclamationSchema);
