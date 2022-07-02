const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");

const router = new Router();

router.post('/logs', async(req, res) => {
    try{
        SpecificLogger(req, { ...req.body, type:"APP"});
        res.sendStatus(201);
    } catch(err){
        res.sendStatus(500);
        next();
    }
})

module.exports = router;