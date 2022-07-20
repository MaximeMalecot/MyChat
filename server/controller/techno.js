const { Techno } = require("../models/postgres");
const { ValidationError } = require("sequelize");

exports.getTechnos = async (req, res) => {
    try {
		const technos = await Techno.findAll();
		res.status(200).json(technos);
    } catch (error) {
      	next();
    }
};

exports.postTechno = async (req, res) => {
    try {
        console.log("ntm");
		const techno = await Techno.create(req.body);
		res.status(201).json(techno);
    } catch (error) {
      	if (error instanceof ValidationError) {
			res.status(422).json({
				quantity: "must be greather than 0",
				title: "must not be empty",
			});
      	} else {
        	next();
      	}
    }
};
