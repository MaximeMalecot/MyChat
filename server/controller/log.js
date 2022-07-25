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
    const { limit, text } = req.query;
    let logs = null;
    const aggregate = [];
    
    if(text){
        aggregate.push({
            $match: { 
                $or: [
                    { message: { $regex: text, $options: 'i' } }
                ]
            }
        });
    }
    if(limit){
        aggregate.push({ $limit: parseInt(limit) });
    }
    
    logs = await Log.aggregate([
        {$sort: {date: 1}},
        ...aggregate
        
    ]);
    return res.status(200).json(logs);
})