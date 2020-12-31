const express=require('express');
const router = express.Router();
const auth = require('../middlewares/isAuth');

//importing mcuco controller

const mcuController = require('../controllers/data')

router.get('/data',mcuController.updateMcData);
router.get('/export',auth.isAuth,mcuController.exportData);
router.post('/export',auth.isAuth,mcuController.getExportData);

module.exports = router;