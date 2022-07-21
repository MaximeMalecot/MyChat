const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const Techno = require("../models/postgres/Techno");
const { SpecificLogger, log } = require("../lib/logger");

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

exports.getSelf = async (req, res, next) => {
    try {
		console.log('aqui');
		const user = await User.findByPk(req.user.id, 
			{
				include: ["technos", "field"]
			}
		);
		if (!user) {
			return res.sendStatus(404);
		} else {
			return res.json(user);
		}
    } catch (error) {
     	next();
    }
};

exports.modifySelf = async (req, res) => {
	if(req.body.id !== req.user.id){
		SpecificLogger(req, {
			message: "Trying to modify someone else's profile",
			level: log.levels.warn,
			type: log.types[0],
		})
		return res.sendStatus(403);
	}
	if(req.body.password === ''){
		delete req.body.password;
	}
	if(req.body.technos){
		delete req.body.technos;
	}
	if(req.body.field){
		delete req.body.field;
	}
	console.log(req.body)
	let result = await User.update(req.body, { where: { id: req.user.id} });
	if(res === 1){
		return res.sendStatus(204);
	} else {
		res.sendStatus(500);
	}
	
}

exports.modifySelfTechno = async (req, res, next) => {
	try{
		let user = await User.findByPk(req.user.id, {
			include: ["technos"]
		});
		let technos = await user.getTechnos();
		technos.map(techno => {
			if(!req.body.selectedTechno.includes(techno.id)){
				user.removeTechno(techno);
			} 
		})
		req.body.selectedTechno.map(techno => {
			if(!technos.includes(techno.id)){
				user.addTechno(techno);
			}
		})
		
		console.log("CONNARD", res)
	} catch (error) {
		next();
	}
}