const AnnonceOffre = require("../Model/AnnonceOffre");
var Produit = require("../Model/produit");
// axios pour consommer une API externe
const axios = require('axios');

async function add(req, res, next) {
    try {
        const { idAnnonce, dateDebutAnnonce, dateFinAnnonce, description, prix, idProduit, image } = req.body;

        // Valider que dateFinAnnonce > dateDebutAnnonce
        if (dateFinAnnonce <= dateDebutAnnonce) {
            return res.status(400).send('dateFinAnnonce doit être supérieure à dateDebutAnnonce');
        }

        // Créer l'instance AnnonceOffre
        const annonceOffre = new AnnonceOffre({
            idAnnonce,
            dateDebutAnnonce,
            dateFinAnnonce,
            description,
            prix,
            idProduits: idProduit, // Assigner le tableau idProduit à idProduits
            image
        });

        // Enregistrer l'instance AnnonceOffre dans la base de données
        await annonceOffre.save();

        res.status(200).send('AnnonceOffre ajoutée avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de l\'ajout de l\'AnnonceOffre');
    }
}

async function afficher(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.find();
        res.status(200).json(annonceOffre);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des AnnonceOffre');
    }
}

async function afficherid(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findById(req.params.id);
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération de l\'AnnonceOffre');
    }
}

async function modifier(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la mise à jour de l\'AnnonceOffre');
    }
}

async function supprimer(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndDelete(req.params.id);
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).send('AnnonceOffre supprimée avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la suppression de l\'AnnonceOffre');
    }
}

// ajouter une fonction IA pour générer une image à partir d'un prompt
async function generateImage(req, res, next) {
    try {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ message: 'Prompt est requis' });
        }

        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            n: 1,
            size: '1024x1024'
        }, {
            headers: {
                'Authorization': 'Bearer ',
                'Content-Type': 'application/json'
            }
        });

        // le résultat de l'image générée par l'IA est stocké dans imageUrl et retourné dans la réponse
        return res.status(200).json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error('Erreur lors de la génération de l\'image:', error.response ? error.response.data : error.message);
        return res.status(500).json({ message: 'Erreur lors de la génération de l\'image', error: error.response ? error.response.data : error.message });
    }
}

// obtenir les produits par ID d'annonce
async function getProduitByAnnounce(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findById(req.params.id);
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
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

//**************************************métier 1 : afficher l'annonce 1******//
// incrémenter le nombre de vues
async function incrementumberOfViews(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfViews: 1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}

// décrémenter le nombre de vues
async function decrementumberOfViews(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfViews: -1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);

    } catch (e) {
        console.log(err);
    }
}

// incrémenter le nombre de likes
async function incrementumberOfLikes(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfLikes: 1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}

// décrémenter le nombre de likes
async function decrementumberOfLikes(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfLikes: -1 } }, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}

//*******************métier 2 : si annonce inactive => donc annonce auto cachée****
async function updateStatus(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}

async function updateAnounceImage(req, res, next) {
    try {
        const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!annonceOffre) {
            return res.status(404).send('AnnonceOffre non trouvée');
        }
        res.status(200).json(annonceOffre);
    } catch (e) {
        console.log(err);
    }
}

module.exports = {
    add,
    afficher,
    afficherid,
    modifier,
    supprimer,
    generateImage,
    getProduitByAnnounce,
    incrementumberOfViews,
    decrementumberOfViews,
    incrementumberOfLikes,
    decrementumberOfLikes,
    updateStatus,
    updateAnounceImage
};
