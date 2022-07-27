const { User, Field, Techno, Report } = require("../models/postgres");
const { User: UserMongo } = require("../models/mongo");
const { ValidationError } = require("sequelize");
const { SpecificLogger, log } = require("../lib/logger");
const formatError = require("../lib/formatError");
const { broadcastAdmins } = require('./sse');
const { REPORT_STATUS } = require("../constants/enums");

exports.getUsers = async (req, res, next) => {
    try {
		const { limit } = req.query;
		let users =null;
		if(typeof limit === "number" && limit > 0){
			users = await User.findAll({ 
				attributes: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"],
				include: [
					{model: Techno, attributes: [ "id", "name"]},
					{model: Report, as: "reported"}
				],
				limit: limit
			})
		}else {
			users = await User.findAll({ 
				attributes: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"],
				include: [
					{model: Techno, attributes: [ "id", "name"]},
					{model: Report, as: "reported"}
				],
			});
		}
		return res.json(users);
    } catch (error) {
		console.error(error);
      	next();
    }
};

exports.postUser = async (req, res, next) => {
    try {
		const user = await User.create(req.body);
		return res.status(201).json(user);
    } catch (error) {
      	if (error instanceof ValidationError) {
			return res.status(422).json({
				email: "Must be an email",
				password: "must not be empty",
				firstName: "must not be empty",
				lastName: "must not be empty",
			});
      	} else {
        	next();
      	}
    }
};

exports.modifyUser = async (req, res, next) => {
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

exports.deleteUser = async (req, res, next) => {
    try {
		const nbLine = await User.destroy({ where: { id: req.params.id },
			individualHooks: true });
		if (!nbLine) {
			return res.sendStatus(404);
		} else {
			const users = await User.findAll({ 
				where: {
					isAdmin: false,
				}, 
				attributes: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"],
				include: [
					{model: Techno, attributes: [ "id", "name"]}
				]
			});
			console.log(users);
			return res.status(204).json({users});
		}
    } catch (error) {
      	next();
    }
};

exports.getUser = async (req, res, next) => {
    try {
		const user = await User.findByPk(req.params.id,
			{
				exclude: ["password"]
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

exports.getSelf = async (req, res, next) => {
    try {
		const user = await User.findByPk(req.user.id, {
			attributes: {
				exclude: ["password", "isAdmin", "createdAt", "updatedAt"]
			},
			include: ["technos"],
		});
		if (!user) {
			return res.sendStatus(404);
		} else {
			return res.json(user);
		}
    } catch (error) {
		console.error(error);
     	next();
    }
};

exports.modifySelf = async (req, res, next) => {
	try {
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
		await User.update(req.body, { where: { id: req.user.id}, individualHooks: true, limit: 1 });
		return res.sendStatus(204);
	}catch(error){
		if (error instanceof ValidationError) {
			SpecificLogger(req, { 
				message:`${req.method} on '${req.originalUrl}' - ${JSON.stringify(formatError(error.errors))}`,
				level: log.levels.info
			});
			return res.status(422).json(formatError(error.errors));
      	} else {
			next();
      	}
	}
	
}

exports.modifySelfTechno = async (req, res, next) => {
	try{
		let user = await User.findByPk(req.user.id, {
			include: ["technos"]
		});
		let technos = await user.getTechnos();
		if(technos && technos.length > 0){
			technos.map(techno => {
				if(!req.body.technos || !req.body.technos.includes(techno.id)){
					user.removeTechno(techno);
				} 
			})
		}
		if(req.body.technos && req.body.technos.length > 0){
			req.body.technos.map(techno => {
				if(!technos.includes(techno.id)){
					user.addTechno(techno);
				}
			})
		}
		return res.sendStatus(204);
	} catch (error) {
		console.error(error);
		next();
	}
}

exports.modifySelfField = async (req, res, next) => {
	try{
		let user = await User.findByPk(req.user.id, {
			include: ["field"]
		});
		let field = await Field.findByPk(req.body.field);
		if(!field){
			return res.sendStatus(404);
		}
		await User.update({fieldId:field.id},{where:{id:user.id}})
		return res.sendStatus(204);
	} catch (error) {
		console.error(error);
		next();
	}
}

exports.searchUsers = async (req, res, next) => {
	try {
		const users = (await UserMongo.aggregate([
			{
				$match: { 
					$and: [
						{
							$or: [
								{ firstName: { $regex: req.query.search, $options: 'i' } },
								{ lastName: { $regex: req.query.search, $options: 'i' } },
							]
						},
						{
							userId: { $ne: req.user.id }
						}
					]
					
				},
			},
			{
				$project: {
					_id: 0,
					firstName: 1,
					lastName: 1,
					userId: 1,
					friendNb: { 
						$size: {
							$filter: {
								input: "$friendList",
								as: "friend",
								cond: { $eq: ["$$friend.status", "ACCEPTED"] }
							}
						}
					}
				}
			},
		]));
		return res.json(users);
	} catch (error) {
		console.error(error);
	  	next();
	}
}

exports.deleteSelf = async (req, res, next) => {
	try {
		const nbLine = await User.destroy({ where: { id: req.user.id } , individualHooks: true});
		if (!nbLine) {
			return res.sendStatus(404);
		} else {
			return res.sendStatus(204);
		}
	} catch (error) {
		console.error(error);
	  	next();
	}
}

exports.reportUser = async (req, res, next) => {
	try{
		let reported = req.params.id;
		let { type, content } = req.body;
		if(reported === req.user.id){
			SpecificLogger(req, {
				message: "Trying to report own profile",
				level: log.levels.warn,
				type: log.types[0],
			})
			return res.sendStatus(403);
		}
		await Report.create({
			type,
			content,
			reported,
			reporter: req.user.id,
		});

		broadcastAdmins({ type: 'new_notification', data: "new report"});
		return res.sendStatus(201);
	} catch (error) {
		console.error(error);
	  	next();
	}
}