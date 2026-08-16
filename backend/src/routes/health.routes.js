const express = require('express');

const router = express.Router();
router.get('/',(req,res) => {
    res.json({
        message:"Yo it's Healthy practice"
    })
})

module.exports = router;
