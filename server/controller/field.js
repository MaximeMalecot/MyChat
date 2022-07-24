const { Field } = require("../models/postgres");
const { ValidationError } = require("sequelize");

exports.getFields = async (req, res) => {
    try {
		const fields = await Field.findAll({ where: req.query });
		res.json(fields);
    } catch (error) {
      	next();
    }
};

exports.postField = async (req, res) => {
    try {
		const field = await Field.create(req.body);
		res.status(201).json(field);
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

exports.putField = async (req, res, next) => {
	try {
		await Field.update({ name: req.body.name },{ where: { id: req.params.id }});
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

exports.deleteField = async (req, res, next) => {
	try {
		await Field.destroy({ where: { id: req.params.id }});
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
