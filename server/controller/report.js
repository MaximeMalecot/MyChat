const { REPORT_STATUS } = require("../constants/enums");
const { SpecificLogger, log } = require("../lib/logger");
const { Report, User } = require('../models/postgres');
const { ValidationError } = require("sequelize");

exports.getAll = async (req, res, next) => {
    try {
        const reports = await Report.findAll();
        if (!reports) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json(reports);
        }
    } catch (error) {
        next();
    }
}

exports.getForUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user){
            SpecificLogger(req, { 
                message:`${req.method} on '${req.originalUrl}' - No user found`,
                level: log.levels.info
            });
            return res.sendStatus(400);
        }
        const reported = await Report.findAll({
            where: {
                reporter: user.id
            }
        });

        const reports = await Report.findAll({
            where: {
                reported: user.id
            }
        });
        return res.status(200).json({
            user,
            reportsFrom: reported,
            reportsTo: reports
        });
    } catch (error) {
        next();
    }
}

const close = async (reportId) => {
    let report = await Report.findByPk(reportId);
    if(!report){
        return false;
    }
    await User.destroy({where:{id:report.reported}, individualHooks: true});
    return true;
}

const resolve = async (reportId) => {
    await Report.update({status: REPORT_STATUS.RESOLVED},{where:{id:reportId}});
    return true;
}

exports.modify = async (req, res, next) => {
    try {
        let { type } = req.body;
        if(type === "close"){
            let result = await close(req.params.id);
            if(!result){
                return res.sendStatus(400);
            }
            return res.sendStatus(204);
        }
        if(type === "resolve"){
            await resolve(req.params.id);
            return res.sendStatus(204);
        }
        return res.sendStatus(400);
    } catch (error) {
        if (error instanceof ValidationError) {
            SpecificLogger(req, { 
                message:`${req.method} on '${req.originalUrl}' - Modification Report Validation error`,
                level: log.levels.info
            });
			return res.status(422).json({
				status: "invalid status",
			});
      	} else {
            console.error(error);
        	next();
      	}
        next();
    }
}