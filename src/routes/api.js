const express = require('express');
const { hello } = require('../controllers/HelloController');
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage,packagesByBranch } = require('../controllers/PackageController');
const { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } = require('../controllers/LocationController');
const { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } = require('../controllers/BranchController');
const { createPrivacy, getAllPrivacy, getPrivacyById, updatePrivacy, deletePrivacy } = require('../controllers/PrivacyController');
const { createBanner, getAllBanner, getBannerById, updateBanner, deleteBanner } = require('../controllers/BannerController');
const { createFeature, getAllFeatures, getFeatureById, updateFeature, deleteFeature } = require('../controllers/FeatureController');
const { createReview, getAllReview, getReviewById, updateReview, deleteReview } = require('../controllers/ReviewController');
const { uploadPhoto, getAllPhoto, getPhotoById, updatePhoto, deletePhoto } = require('../controllers/PhotoGalleryController');
const { uploadVideo, getAllVideo, getVideoById, updateVideo, deleteVideo } = require('../controllers/VideoGalleryController');
const { createAdmin, updateUserRole, adminLogin, checkAdmin, getAllUsers, deleteUser } = require('../controllers/UserController');
const { verifyAdmin } = require('../middlewares/AdminVerifyMiddleware');


const router = express.Router();

// checking api 
router.get('/', hello);

// package related api 
router.post('/createPackage', createPackage);
router.get('/getAllPackages', getAllPackages);
router.get('/getPackageById/:id', getPackageById);
router.put('/updatePackage/:id', updatePackage);
router.delete('/deletePackage/:id', verifyAdmin, deletePackage);
router.get("/packages-by-branch/:id", packagesByBranch )


// location related api
router.post('/createLocation', verifyAdmin, createLocation);
router.get('/getAllLocations',  getAllLocations);
router.get('/getLocationById/:id', getLocationById);
router.put('/updateLocation/:id', verifyAdmin, updateLocation);
router.delete('/deleteLocation/:id', verifyAdmin, deleteLocation);

// branch related api 
router.post('/createBranch', verifyAdmin, createBranch);
router.get('/getAllBranches', getAllBranches);
router.get('/getBranchById/:id', getBranchById);
router.put('/updateBranch/:id', updateBranch);
router.delete('/deleteBranch/:id', deleteBranch);

// privacy related api 
router.post('/createPrivacy', createPrivacy);
router.get('/getAllPrivacy', getAllPrivacy);
router.get('/getPrivacyById/:id', getPrivacyById);
router.put('/updatePrivacy/:id', updatePrivacy);
router.delete('/deletePrivacy/:id', deletePrivacy);

// banner related api 
router.post('/createBanner', verifyAdmin, createBanner);
router.get('/getAllBanner', getAllBanner);
router.get('/getBannerById/:id', getBannerById);
router.put('/updateBanner/:id', verifyAdmin, updateBanner);
router.delete('/deleteBanner/:id', deleteBanner);

// feature related api 
router.post('/createFeature', createFeature);
router.get('/getAllFeatures', getAllFeatures);
router.get('/getFeatureById/:id', getFeatureById);
router.put('/updateFeature/:id', updateFeature);
router.delete('/deleteFeature/:id', deleteFeature);

// review related api 
router.post('/createReview', createReview);
router.get('/getAllReview', getAllReview);
router.get('/getReviewById/:id', getReviewById);
router.put('/updateReview/:id', updateReview);
router.delete('/deleteReview/:id', deleteReview);


// photo gallery related api 
router.post('/uploadPhoto', uploadPhoto);
router.get('/getAllPhoto', getAllPhoto);
router.get('/getPhotoById/:id', getPhotoById);
router.put('/updatePhoto/:id', updatePhoto);
router.delete('/deletePhoto/:id', deletePhoto);

// video gallery related api 
router.post('/uploadVideo', verifyAdmin, uploadVideo);
router.get('/getAllVideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.put('/updateVideo/:id',verifyAdmin, updateVideo);
router.delete('/deleteVideo/:id', verifyAdmin, deleteVideo);

// admin related api 
router.post('/createAdmin', createAdmin);
router.post('/updateUserRole', verifyAdmin, updateUserRole);
router.post('/adminLogin', adminLogin);
router.post("/admin-only-route", verifyAdmin, checkAdmin);
router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.delete("/deleteUser/:id", verifyAdmin, deleteUser);

//This is a test.
//This is a test2

module.exports = router