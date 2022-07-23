const {getLiveConnections} = require('./sse');

exports.getLiveConnections = async (req, res, next) => {
    try{
        return res.status(200).json({
            connected_users: getLiveConnections()
        });
    }catch(err){
        next();
    }
}

exports.postAnalytic = async (req, res) => {
    try{
        return res.sendStatus(201);
    }catch(err){
        next();
    }
}

exports.getAnalytics = async (req, res, next) => {
    try{
        return res.sendStatus(200);
    }catch(err){
        next();
    }
}