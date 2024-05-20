const AnnonceOffre = require("../Model/AnnonceOffre")
var Produit = require("../Model/produit")
const axios = require('axios');


async function add(req, res, next) {
    try {
        const { idAnnonce, dateDebutAnnonce, dateFinAnnonce, description, prix, idProduit, image } = req.body;

        // Validate dateFinAnnonce > dateDebutAnnonce
        if (dateFinAnnonce <= dateDebutAnnonce) {
            return res.status(400).send('dateFinAnnonce must be greater than dateDebutAnnonce');
        }

        // Create the AnnonceOffre instance
        const annonceOffre = new AnnonceOffre({
            idAnnonce,
            dateDebutAnnonce,
            dateFinAnnonce,
            description,
            prix,
            idProduits: idProduit, // Assign the idProduit array to idProduits
            image
        });

        // Save the AnnonceOffre instance to the database
        await annonceOffre.save();

        res.status(200).send('AnnonceOffre ajoutée avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de l\'ajout de l\'annonceOffre');
    }
}


  async function afficher(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.find();
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des annonceOffre');
    }
  }

  async function afficherid(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findById(req.params.id);
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de annonceOffre');
    }
  }

  

  async function modifier(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'annonceOffre');
    }
  }

  async function supprimer(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findByIdAndDelete(req.params.id);
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).send('annonceOffre supprimé avec succès');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de annonceOffre');
    }
  }
// adding AI function to generate image from prompt
async function generateImage(req, res, next) {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    }, {
      headers: {
        'Authorization': `Bearer `,
        'Content-Type': 'application/json'
      }
    });
    /// le resultat de l'image généré par l'IA est stocké dans imageUrl et retourné dans le response
    return res.status(200).json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'Error generating image', error: error.response ? error.response.data : error.message });
  }
}
// get products by announce id
async function getProduitByAnnounce(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findById(req.params.id);
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvé');
    }
    const produits = await Produit.find({ _id: { $in: annonceOffre.idProduits } });
    if (!produits || produits.length === 0) {
      return res.status(404).send('Aucun produit trouvé pour cette annonce');
    }
    res.status(200).json(produits);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
}
// increment number of views and likes
async  function incrementumberOfViews(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate
        (req.params.id, { $inc: { numberOfViews: 1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('annonceOffre non trouvé');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
             console.log(err);
    }
}
async  function incrementumberOfLikes(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate
        (req.params.id, { $inc: { numberOfLikes: 1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('annonceOffre non trouvé');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
             console.log(err);
    }
}
// decrement number of views and likes
async function decrementumberOfLikes(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate
        (req.params.id, { $inc: { numberOfLikes: -1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('annonceOffre non trouvé');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
             console.log(err);
    }}

async function updateStatus(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate
        (req.params.id, req.body, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('annonceOffre non trouvé');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
             console.log(err);
    }}

async function updateAnounceImage(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate
        (req.params.id, req.body, {new: true});
        if (!annonceOffre) {
            return res.status(404).send('annonceOffre non trouvé');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}
  module.exports = {add,afficher,afficherid,modifier,supprimer, generateImage, getProduitByAnnounce, incrementumberOfViews, incrementumberOfLikes, decrementumberOfLikes, updateStatus, updateAnounceImage}