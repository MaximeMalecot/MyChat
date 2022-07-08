const { SpecificLogger, logInfo } = require("../lib/logger");
const { Log, mongoose } = require("../models/mongo");

exports.postLog = ( async(req, res) => {
    try{
        SpecificLogger(req, { ...req.body, type:"APP"});
        return res.sendStatus(201);
    } catch(err){
        next();
    }
})

exports.getLogs = ( async(req, res) => {
    let {
        type,
        message,
        date,
        level,
        route
    } = req.query;
    let pipelines = [];
    if(type){
        if(typeof type !== "string" || !logInfo.types.includes(type)){
            SpecificLogger(req, { 
                message:`${req.method} on '${req.originalUrl}' - Type malformated`,
                level: 1
            });
            return res.status(400).json({
                message: "type malformated"
            });
        }
        pipelines.push({
            $match: { "type": type}
        });
    } 
    if(message){
        pipelines.push({
            $match: { "message": message}
        });
    }
    if(date){
        date = new Date(date);
        if(isNaN(date)){
            SpecificLogger(req, { 
                message:`${req.method} on '${req.originalUrl}' - Date malformated`,
                level: 1
            });
            return res.status(400).json({
                message: "date malformated"
            });
        }
        pipelines.push({
            $match: { "date": { $eq: date}}
        });
    }
    if(level){
        level = parseInt(level);
        if(isNaN(level) || !logInfo.levels.includes(level)){
            SpecificLogger(req, { 
                message:`${Object.keys(req.route.methods)[0].toUpperCase()} on '${req.route.path}' - Level malformated`,
                level: 1
            });
            return res.status(400).json({
                message: "level malformated"
            });
        }
        pipelines.push({
            $match: { "level": level}
        });
    }
    if(route){
        pipelines.push({
            $match: { "route": route}
        });
    }
    const logs = await Log.aggregate(pipelines);
    return res.status(200).json(logs);
})