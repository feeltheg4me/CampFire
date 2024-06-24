const Reclamation = require("../Model/Reclamation");
const User = require("../Model/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Load email configuration from dbConnection.json
const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'dbConnection.json'), 'utf8'));

async function sendDeletionEmail(userEmail) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: dbConfig.EMAIL_SERVICE,
    auth: {
      user: dbConfig.EMAIL_USER,
      pass: dbConfig.EMAIL_PASS,
    },
  });

  // Set up email data
  let mailOptions = {
    from: dbConfig.EMAIL_USER,
    to: userEmail,
    subject: 'Account Deleted Due to Excessive Reclamations',
    text: 'Your account has been deleted after reaching 3 reclamations. Please contact support for more details.',
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

async function add(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la réclamation sont manquantes.');
    }

    const date = req.body.date;
    const description = req.body.description;
    const idUtilisateur = req.body.idUtilisateur;
    const nbreCommande = req.body.nbreCommande;
    const titre = req.body.titre;
    const  status = req.body.status;

    // Validate if all required fields are present
    if (! status ||!date || !description || !idUtilisateur || !nbreCommande||!titre) {
      console.log('Extracted data:', {  status, date, description, idUtilisateur, nbreCommande });

      return res.status(400).send('Tous les champs sont requis .');
    }

    // Handle file upload using Multer



      // Get the image path from Multer
      const imagePath = req.file ? req.file.path : null;

      // Create a new reclamation object with the image path
      const reclamation = new Reclamation({ status, titre, date, description, idUtilisateur, nbreCommande, picture: imagePath });

      // Save the reclamation
      await reclamation.save();

    // Count the number of reclamations for the user with status 'treated'
    const reclamationCount = await Reclamation.countDocuments({ idUtilisateur, status: 'traiter' });
    console.log(`Reclamation count for user ${idUtilisateur} with status 'treated':`, reclamationCount);

    // If the user has 3 reclamations, delete the user and their reclamations
      if (reclamationCount >= 3) {
        const user = await User.findById(idUtilisateur);
        console.log('User found:', user);
        if (user) {
          await User.findByIdAndDelete(idUtilisateur);
          await Reclamation.deleteMany({ idUtilisateur });
          console.log('User and their reclamations deleted');

          // Send deletion email
          await sendDeletionEmail(user.email);
          console.log('Deletion email sent to:', user.email);

          return res.status(200).send('utilisateur a été supprimé après avoir atteint 3 réclamations.');
        } else {
          console.log('User not found for ID:', idUtilisateur);
        }
      }

      res.status(200).send();

  } catch (err) {
    console.error('Erreur lors de l\'ajout de la réclamation:', err);
    res.status(500).send('Erreur lors de l\'ajout de la réclamation.');
  }
}
async function afficherparutilisateur(req, res, next) {
  try {
    const { id } = req.params;


    // Find reclamations based on idUtilisateur
    const reclamations = await Reclamation.find({ idUtilisateur: id});

    res.status(200).json(reclamations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réclamations:', err);
    res.status(500).send('Erreur lors de la récupération des réclamations.');
  }
}


async function afficher(req, res, next) {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réclamations:', err);
    res.status(500).send('Erreur lors de la récupération des réclamations.');
  }
}

async function afficherid(req, res, next) {
  try {
    const { id } = req.params;

    // Validate the ID format

    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findOne({idReclamation:id});
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).json(reclamation);
  } catch (err) {
    console.error('Erreur lors de la récupération de la réclamation:', err);
    res.status(500).send('Erreur lors de la récupération de la réclamation.');
  }
}
// New function to change status
async function changerStatus(req, res, next) {
  try {
    const { id } = req.params;

    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findOneAndUpdate(
        {idReclamation:id},
        { status: 'traiter' },
        { new: true }
    );

    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }

    res.status(200).json(reclamation);



  } catch (err) {
    console.error('Erreur lors de la mise à jour de la réclamation:', err);
    res.status(500).send('Erreur lors de la mise à jour de la réclamation.');
  }
}
async function refuserreclamation(req, res, next) {
  try {
    const { id, iduser } = req.params;
    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }
const idUtilisateur= iduser;
    const reclamation = await Reclamation.findOneAndUpdate(
        {idReclamation:id},
        { status: 'refuser' },
        { new: true }
    );




    // Count the number of reclamations for the user with status 'treated'
    const reclamationCount = await Reclamation.countDocuments({ idUtilisateur, status: 'refuser' });
    console.log(`Reclamation count for user ${idUtilisateur} with status 'treated':`, reclamationCount);

    // If the user has 3 reclamations, delete the user and their reclamations
    if (reclamationCount >= 3) {
      const user = await User.findById(idUtilisateur);
      console.log('User found:', user);
      if (user) {
        await Reclamation.deleteMany({ idUtilisateur });
        await User.findByIdAndDelete(idUtilisateur);

        console.log('User and their reclamations deleted');

        // Send deletion email
        await sendDeletionEmail(user.email);
        await sendDeletionEmail(user.email);
        console.log('Deletion email sent to:', user.email);

        return res.status(200).json({ message: 'user deleted with his claims' });
      } else {
        console.log('User not found for ID:', idUtilisateur);
      }
    }


    res.status(200).json({ message: 'refuser' });


  } catch (err) {
    console.error('Erreur lors de la mise à jour de la réclamation:', err);
    res.status(500).send('Erreur lors de la mise à jour de la réclamation.');
  }
}

async function modifier(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la réclamation sont manquantes.');
    }

    const { id } = req.params;

    // Validate the ID format
    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findOneAndUpdate({ idReclamation: id }, { titre: req.body.titre,description: req.body.description }, { new: true });
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).json(reclamation);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la réclamation:', err);
    res.status(500).send('Erreur lors de la mise à jour de la réclamation.');
  }
}

async function supprimer(req, res, next) {
  try {
    const { id } = req.params;

    // Validate the ID format
    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findOneAndDelete({ idReclamation: id });
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).send();
  } catch (err) {
    console.error('Erreur lors de la suppression de la réclamation:', err);
    res.status(500).send('Erreur lors de la suppression de la réclamation.');
  }
}
async function searchByKeyword(req, res, next) {
  try {
    const { keyword } = req.query;


    if (!keyword) {
      return res.status(400).send('Un mot-clé est requis pour la recherche.');
    }


    const reclamations = await Reclamation.find({
      $or: [ //el or tlwjlna fl titre wla description
        { titre: { $regex: keyword, $options: 'i' } }, // regex ya3mlelna recherche partielle ya3ni lkeyword ytabe9 joz2eyan m3a ltitre
        { description: { $regex: keyword, $options: 'i' } } // i ya3ni case sensitive lel maj wla miniscule ya3ni myhmouch bin maj wmin
      ]
    });

    // Check if any reclamation is found
    if (reclamations.length === 0) {
      return res.status(404).send('Aucune réclamation trouvée.');
    }

    // Send the found reclamations
    res.status(200).json(reclamations);
  } catch (err) {
    console.error('Erreur lors de la recherche de la réclamation:', err);
    res.status(500).send('Erreur lors de la recherche de la réclamation.');
  }
}

// Aggregation for the pie chart
async function piechartCountReclamationByStatus(req, res) {
  try {
    const data = await Reclamation.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);
    // Send the formatted data as a JSON response
    res.json({
      labels: labels,
      counts: counts
    });


  } catch (err) {
    res.status(500).send(err);
  }
}
// Aggregation for the bar chart
async function usermostreclamation(req, res) {
  try {
    const data = await Reclamation.aggregate([
      {
        $group: {
          _id: '$idUtilisateur',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5 // Get top 5 users
      },
      {
        $lookup: {
          from: 'users', // Name of the User collection
          localField: '_id',//khdhe esm el _id mt3 group mt3 reclamation li hatina fih el iduser
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 0,
          idUtilisateur: '$_id',
          count: 1,
          username: '$userDetails.name'
        }
      }
    ]);

    const labels = data.map(item => item.username);
    const counts = data.map(item => item.count);
    res.json({
      labels: labels,
      counts: counts
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
async function reclamationsByMonth(req, res) {
  try {
    const currentYear = new Date().getFullYear(); // Obtenir l'année en cours
    const data = await Reclamation.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, 0, 1), // Date de début de l'année en cours (1er janvier)
            $lt: new Date(currentYear + 1, 0, 1) // Date de fin de l'année en cours (1er janvier de l'année suivante)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' }, // Grouper par mois de la date de réclamation
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } } // Trier par mois croissant
    ]);

    const labels = data.map(item => new Date(2000, item._id - 1).toLocaleString('default', { month: 'short' })); // Convertir le numéro de mois en nom court
    const counts = data.map(item => item.count);

    res.json({
      labels: labels,
      counts: counts
    });
  } catch (err) {
    res.status(500).send(err);
  }
}


async function reclamationsCountToday(req, res) {
  try {
    const today = new Date(); // Get today's date
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // End of today (exclusive)

    const data = await Reclamation.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);

    let count = 0;
    if (data.length > 0) {
      count = data[0].count;
    }

    res.json({
      count: count
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function reclamationsExceeding3DaysPending(req, res) {
  try {
    const today = new Date(); // Date actuelle
    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000); // Date il y a 3 jours

    const data = await Reclamation.aggregate([
      {
        $match: {
          status: 'en attente', // Filtrer par statut "en attente"
          date: { $lte: threeDaysAgo } // Date de réclamation antérieure à il y a 3 jours
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);

    let count = 0;
    if (data.length > 0) {
      count = data[0].count;
    }

    res.json({
      count: count
    });
  } catch (err) {
    res.status(500).send(err);
  }
}


module.exports = {reclamationsExceeding3DaysPending,reclamationsCountToday, reclamationsByMonth,add, afficher, afficherid, modifier, supprimer,afficherparutilisateur,changerStatus,refuserreclamation,searchByKeyword,piechartCountReclamationByStatus,usermostreclamation};
