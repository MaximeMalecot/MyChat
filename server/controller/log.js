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
    const { limit=5, text='' } = req.query;
    let logs = null;
    const aggregate = [];

    if(text===''){
        logs = await Log.find().sort({ date: -1 }).limit(parseInt(limit));
        return res.status(200).json(logs);
    }
    logs = await Log.find(
        {$text: { $search: text }}, 
    ).sort({ date: -1 }).limit(parseInt(limit));

    return res.status(200).json(logs);
})