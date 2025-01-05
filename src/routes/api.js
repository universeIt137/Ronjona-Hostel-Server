const express = require('express');
const { hello } = require('../controllers/HelloController');
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require('../controllers/PackageController');
const { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } = require('../controllers/LocationController');
const { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } = require('../controllers/BranchController');


const router = express.Router();

// checking api 
router.get('/', hello);

// package related api 
router.post('/createPackage', createPackage);
router.get('/getAllPackages', getAllPackages);
router.get('/getPackageById/:id', getPackageById);
router.put('/updatePackage/:id', updatePackage);
router.delete('/deletePackage/:id', deletePackage);


// location related api
router.post('/createLocation', createLocation);
router.get('/getAllLocations', getAllLocations);
router.get('/getLocationById/:id', getLocationById);
router.put('/updateLocation/:id', updateLocation);
router.delete('/deleteLocation/:id', deleteLocation);

// branch related api 
router.post('/createBranch', createBranch);
router.get('/getAllBranches', getAllBranches);
router.get('/getBranchById/:id', getBranchById);
router.put('/updateBranch/:id', updateBranch);
router.delete('/deleteBranch/:id', deleteBranch);

module.exports = router