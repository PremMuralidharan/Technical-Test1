const express = require('express');
const router = express.Router();
const Pass = require("../models/passwordpost");

router.post('/', async(req,res) => {
    const pass = new Pass.password({
        password: req.body.data,
    })

    try{
        const t1 =  await pass.save() 
        res.json(t1)
    }catch(err){
        console.log(err,"errpr");
        res.send('Error')
    }
})

module.exports = router