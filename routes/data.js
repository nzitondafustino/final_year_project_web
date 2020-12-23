const express=require('express');
const router = express.Router();

//importing mcuco controller

const mcuController = require('../controllers/data')

router.get('/data',mcuController.updateMcData);

module.exports = router;