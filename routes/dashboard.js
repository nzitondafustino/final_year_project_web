const express=require('express');

const router = express.Router();
//import middleware

const auth = require('../middlewares/isAuth');
//importing controllers

const deviceController = require('../controllers/device');

const userController = require('../controllers/user');

//importing  user validation
const userValidations = require('../validations/user');

const deviceValidations = require('../validations/device');

router.get('/dashboard',auth.isAuth,deviceController.dashboard);

router.post('/add-user',auth.isAdmin,userValidations.addUser,userController.postAddUser);

router.post('/update-user/:id',auth.isAdmin,userValidations.updateUser,userController.updateUser);

router.post('/delete-user/:id',auth.isAdmin,userController.deleteUser);

router.get('/add-user',auth.isAdmin,userController.getAddUser);

router.get('/all-users',auth.isAdmin,userController.allUser);

router.get('/add-device',auth.isAuth,deviceController.getAddDevice);

router.post('/update-device/:id',auth.isAuth,deviceValidations.updateDevice,deviceController.updateDevice);

router.post('/delete-device/:id',auth.isAuth,deviceController.deleteDevice);

router.post('/add-device',auth.isAuth,deviceValidations.addDevice,deviceController.postAddDevice);

router.post('/login',userController.userLogin)

router.post('/logout',userController.userLogout)

module.exports = router;