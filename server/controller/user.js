const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

exports.getUsers = async (req, res) => {
    try {
		const users = await User.findAll({ where: req.query });
		return res.json(users);
    } catch (error) {
      	next();
    }
};

exports.postUser = async (req, res) => {
    try {
		const user = await User.create(req.body);
		return res.status(201).json(user);
    } catch (error) {
      	if (error instanceof ValidationError) {
			return res.status(422).json({
				quantity: "must be greather than 0",
				title: "must not be empty",
			});
      	} else {
        	next();
      	}
    }
};

exports.modifyUser = async (req, res) => {
    try {
		const result = await User.update(req.body, {
			where: { id: req.params.id },
			returning: true,
			individualHooks: true,
		});
		const [, lines] = result;
		if (!lines[0]) {
			return res.sendStatus(404);
		} else {
			return res.json(lines[0]);
		}
    } catch (error) {
		if (error instanceof ValidationError) {
			console.error(error);
			return res.status(422).json({
				quantity: "must be greather than 0",
				title: "must not be empty",
			});
		} else {
			next();
		}
    }
}

exports.deleteUser = async (req, res) => {
    try {
		const nbLine = await User.destroy({ where: { id: req.params.id } });
		if (!nbLine) {
			return res.sendStatus(404);
		} else {
			return res.sendStatus(204);
		}
    } catch (error) {
      	next();
    }
};

exports.getUser = async (req, res) => {
    try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.sendStatus(404);
		} else {
			return res.json(user);
		}
    } catch (error) {
     	next();
    }
};