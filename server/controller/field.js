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
