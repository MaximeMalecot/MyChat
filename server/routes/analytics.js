const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");

const router = new Router();

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