const { Log, mongoose } = require("../models/mongo");

const log = {
    types: [
        'SERVER',
        'APP'
    ],
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    }
}

const Logger = (errorObject) => {
    const log = new Log(errorObject);
    log.save()
        .then(console.log)
        .catch(console.error)
}

const SpecificLogger = ( req, { message='undefined', level=log.levels.info, type='SERVER', route=req.originalUrl }) => {
    if(!Object.values(log.levels).includes(level)){
        throw new Error('Not RFC friendly log');
    }
    if(!log.types.includes(type)){
        throw new Error('Unkonw log type');
    }
    let errorObject = {
        message,
        level,
        type,
        route,
    };
    Logger(errorObject);
}

const GlobalLogger = (req) => {
    let errorObject = {
        message: `${req.method} on '${req.originalUrl}' - Unknown error `,
        level: log.levels.error,
        route: req.originalUrl,
    };
    Logger(errorObject);
}

module.exports = { Logger, GlobalLogger, SpecificLogger, log }