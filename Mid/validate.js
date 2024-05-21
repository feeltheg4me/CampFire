const yup = require("yup");

const validate = async (req, res, next) => {
    try {
        const Schema = yup.object().shape({
            lieu: yup.string().matches(/^[a-zA-Z]+$/, 'Le champ lieu doit contenir uniquement des lettres A-Z ou a-z.').required(),
            date: yup.date().required(),
            idUtilisateur: yup.number().required().positive().integer(),
            nbrePrticipants: yup.number().required().positive().integer(),
            
        });

        await Schema.validate(req.body, { abortEarly: false }); // Permet de valider tous les champs et de ne pas arrêter à la première erreur

        next(); // Appeler next() si la validation est réussie
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Gérer les erreurs de validation
            const errors = {};
            error.inner.forEach(err => {
                errors[err.path] = err.errors; // Stocker les erreurs dans un objet avec le nom du champ comme clé
            });
            console.log('Erreurs de validation :', errors);
        } else {
            console.log('Erreur inattendue :', error);
        }
    }
};

module.exports = validate;
