const { Filiere } = require("../models/postgres");
const { ValidationError } = require("sequelize");

exports.getFilieres = async (req, res) => {
    try {
      const filieres = await Filiere.findAll({ where: req.query });
      res.json(filieres);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
};

exports.postFiliere = async (req, res) => {
    try {
      const filiere = await Filiere.create(req.body);
      res.status(201).json(filiere);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422).json({
          quantity: "must be greather than 0",
          title: "must not be empty",
        });
      } else {
        res.sendStatus(500);
        console.error(error);
      }
    }
};
