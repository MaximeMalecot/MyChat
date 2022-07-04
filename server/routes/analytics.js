const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");

const connected_users = [];

const router = new Router();

router.get("/connect", (req, res) => {
    const id = Date.now();
    connected_users[id] = res;
    console.log("connected subscriber", Object.values(connected_users).length);
    req.on('close', function(){
        console.log("remove subscriber", Object.values(connected_users).length);
        delete connected_users[id];
    })
});

router.get("/admin/connections", async(req, res) => {
    try{
        return res.status(200).json({
            connected_users: Object.values(connected_users).length
        });
    }catch(err){
        next();
    }
})

router.post('/analytics', async (req, res) => {
    try{
        res.sendStatus(201);
    }catch(err){
        next();
    }
})

router.get('/analytics', async (req, res, next) => {
    try{
        res.sendStatus(200);
    }catch(err){
        next();
    }
})

module.exports = router;