const express = require('express');
const { hello } = require('../controllers/HelloController');
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require('../controllers/PackageController');

const router = express.Router();

// checking api 
router.get('/', hello);

// package related api 
router.post('/createPackage', createPackage);
router.get('/getAllPackages', getAllPackages);
router.get('/getPackageById/:id', getPackageById);
router.put('/updatePackage/:id', updatePackage);
router.delete('/deletePackage/:id', deletePackage);

module.exports = router