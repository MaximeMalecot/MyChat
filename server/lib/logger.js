const { Log, mongoose } = require("../models/mongo");

/**
 * ERROR : {
 *  Type: string 'SERVER' <> 'FRONT',
 *  Message: string ,
 *  Date: Timestamp,
 *  Level: integer,
 *  Route: string
 * }
 * 
 * LogLevels:{
 *  0: critical,
 *  1: security,
 *  2: basic,
 * }
*/

const Logger = (errorObject) => {
    const log = new Log(errorObject);
    log.save()
        .then((data)=>{
            console.log("saved")
        })
        .catch(console.error)
    console.log(errorObject);
    //SAVE INMONGODB
}

const SpecificLogger = ( req, { message='undefined', level=2, type='SERVER', route=req.route.path }) => {
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
        message: `${Object.keys(req.route.methods)[0].toUpperCase()} on '${req.route.path}' - Unknown error `,
        level: 0,
        route: req.route.path,
    };
    Logger(errorObject);
}

module.exports = { Logger, GlobalLogger, SpecificLogger }