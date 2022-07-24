const { SpecificLogger, log } = require("../lib/logger");

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
        const reported = await Report.findAll({
            where: {
                reporter: req.params.userId
            }
        });

        const reports = await Report.findAll({
            where: {
                reported: req.params.userId
            }
        });
        if (!report) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json({
                reportsFrom: reported,
                reportsTo: reports
            });
        }
    } catch (error) {
        next();
    }
}

exports.modify = async (req, res, next) => {
    try {
        const nbLine = await Report.update({ status: req.body }, {
            where: {
                id: req.params.id
            }
        });
        if (!nbLine) {
            return res.sendStatus(404);
        } else {
            return res.sendStatus(204);
        }
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
        	next();
      	}
        next();
    }
}