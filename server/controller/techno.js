const { Techno } = require("../models/postgres");
const { ValidationError } = require("sequelize");

exports.getTechnos = async (req, res) => {
    try {
		const technos = await Techno.findAll({
			order: [
				['createdAt', 'ASC'],
			],
		});
		res.status(200).json(technos);
    } catch (error) {
      	next();
    }
};

exports.postTechno = async (req, res, next) => {
    try {
		const techno = await Techno.create(req.body);
		res.status(201).json(techno);
    } catch (error) {
      	if (error instanceof ValidationError) {
			res.status(422).json({
				name: "Invalid name",
			});
      	} else {
        	next();
      	}
    }
};

exports.putTechno = async (req, res, next) => {
	try {
		await Techno.update({ name: req.body.name },{ where: { id: req.params.id }});
		res.sendStatus(204);
    } catch (error) {
      	if (error instanceof ValidationError) {
			res.status(422).json({
				id: "Invalid ressource",
			});
      	} else {
        	next();
      	}
    }
}

exports.deleteTechno = async (req, res, next) => {
	try {
		await Techno.destroy({ where: { id: req.params.id }});
		res.sendStatus(202);
    } catch (error) {
      	if (error instanceof ValidationError) {
			res.status(422).json({
				id: "Invalid ressource",
			});
      	} else {
        	next();
      	}
    }
}
