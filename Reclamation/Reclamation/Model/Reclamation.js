const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema({
  idReclamation: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nbreCommande: { type: Number, required: true }
});

module.exports = mongoose.model("Reclamation", reclamationSchema);
