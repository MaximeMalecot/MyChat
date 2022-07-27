const { Analytic } = require('../models/mongo');
const {getLiveConnections} = require('./sse');

exports.getLiveConnections = async (req, res, next) => {
    try{
        return res.status(200).json({
            users: getLiveConnections()
        });
    }catch(err){
        next();
    }
}

exports.postAnalytic = async (req, res, next) => {
    try{
        const {
            page,
            action,
            client
        } = req.body;
        let analytic = await Analytic.create({
            page, action, client
        })
        return res.sendStatus(201);
    }catch(err){
        next();
    }
}

const getBaseAnalytics = () => {
    return Analytic.aggregate([
        { "$group": {
            "_id": {
                "page": "$page",
                "action": "$action"
            },
            "actionCount": { "$sum": 1 }
        }},
        { "$group": {
            "_id": "$_id.page",
            "actions": { 
                "$push": { 
                    "action": "$_id.action",
                    "count": "$actionCount"
                },
            },
            "count": { "$sum": "$actionCount" }
        }},
        { "$sort": { "count": -1 } },
    ])
}

const getAnalyticsByClient = () => {
    return Analytic.aggregate([
        {
            $group: { 
                _id: { 
                    client: "$client",
                    page: "$page", 
                    action: "$action" 
                }
            }
        },
        {
            $group: { 
                _id: { 
                    client: "$_id.client",
                    page: "$_id.page" 
                },
                action: {
                    $push: "$_id.action"
                },
            }
        },
        {
            $group: { 
                _id: "$_id.client",
                page: {
                    $push: { 
                        page: "$_id.page", 
                        action: "$action",
                    }
                },
            }
        },
        {
            $project: { 
                _id: 0, 
                client: "$_id", 
                pages: "$page" 
            }
        }
    ])
}

const getAnalyticsFromClient = (client_id) => {
    return Analytic.aggregate([
        {
            "$match" : {
                client: client_id
            }
        },
        { "$sort": { "date": -1 } },
    ])
}

exports.getAnalytics = async (req, res, next) => {
    try{
        const { q, client } = req.query;
        let analytics = []
        if(q){
            if(client){
                analytics = await getAnalyticsFromClient(client);
                return res.status(200).json(analytics);
            }
            analytics = await getAnalyticsByClient();
            return res.status(200).json(analytics);
        }
        analytics = await getBaseAnalytics();
        return res.status(200).json(analytics);
    }catch(err){
        console.error(err);
        next();
    }
}

exports.getAnalyticsFromClient = async (req, res, next) => {
    try{
        const analytics = await Analytic.aggregate([
            { "$group": {
                "_id": {
                    "client": "$client",
                    "page": "$page",
                    "action": "$action"
                },
                "actionCount": { "$sum": 1 }
            }},
            { "$group": {
                "_id": "$_id.page",
                "actions": { 
                    "$push": { 
                        "action": "$_id.action",
                        "count": "$actionCount"
                    },
                },
                "count": { "$sum": "$actionCount" }
            }},
            { "$sort": { "count": -1 } },
        ])
        return res.status(200).json(analytics);
    }catch(err){
        console.error(err);
        next();
    }
}

