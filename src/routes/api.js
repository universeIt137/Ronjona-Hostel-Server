const express = require('express');
const { hello } = require('../controllers/HelloController');
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage, packagesByBranch, branchByPackages, locationBranchPackages, } = require('../controllers/PackageController');
const { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } = require('../controllers/LocationController');
const { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch, locationByBranch } = require('../controllers/BranchController');
const { createPrivacy, getAllPrivacy, getPrivacyById, updatePrivacy, deletePrivacy, postPrivacy } = require('../controllers/PrivacyController');
const { createBanner, getAllBanner, getBannerById, updateBanner, deleteBanner } = require('../controllers/BannerController');
const { createFeature, getAllFeatures, getFeatureById, updateFeature, deleteFeature } = require('../controllers/FeatureController');
const { createReview, getAllReview, getReviewById, updateReview, deleteReview } = require('../controllers/ReviewController');
const { uploadPhoto, getAllPhoto, getPhotoById, updatePhoto, deletePhoto } = require('../controllers/PhotoGalleryController');
const { uploadVideo, getAllVideo, getVideoById, updateVideo, deleteVideo } = require('../controllers/VideoGalleryController');
const { createAdmin, updateUserRole, adminLogin, checkAdmin, getAllUsers, deleteUser } = require('../controllers/UserController');
const { verifyAdmin } = require('../middlewares/AdminVerifyMiddleware');
const { CreateOffer, AllOffer, OfferById, OfferUpdate, OfferDelete } = require('../controllers/OfferController');
const { sendContactData, allContactData, statusUpdate, deleteContact } = require('../controllers/ContactController');
const { aboutDataUpload, aboutDataById } = require('../controllers/AboutController');
const { missionDataUpload } = require('../controllers/VissionMissionController');
const { createTeam, getAllTeamMember, getTeamMemberById, updateTeam, deleteTeam } = require('../controllers/TeamController');
const { createBooking, manageBookingPackages, bookingFromStatusUpdate, deleteFrom, bookingUpload, allBookingData, bookingById } = require('../controllers/BookingController');
const { whyChooseDataUpload, chooseDataById } = require('../controllers/WhyChooseController');
const { missionVisionUpload, missionvissionById } = require('../controllers/missionVissionController');
const { createKeyFeature, getAllKeyFeatures, keyFeatureFindById, keyFeatureUpdate, deleteKeyFeature, keyFeatureUpload, keyFeatureData } = require('../controllers/KeyFeatureController');
const { createFaq, allFaq, faqById, faqUpdate, faqDelete } = require('../controllers/FaqController');
const { cratePayment, getAllPayment, paymentById, paymentUpdate, paymentDelete } = require('../controllers/PymentController');
const { postTermCondiction, getTermCondictionById } = require('../controllers/TermCondictionController');
const { postRefund, getRefundById } = require('../controllers/RefundController');
const { uploadHotline, allNumber, hotlineById, hotlineUpdate, hotlineDelete } = require('../controllers/HotlineController');


const router = express.Router();

// checking api 
router.get('/', hello);

// package related api 
router.post('/createPackage', createPackage);
router.get('/getAllPackages', getAllPackages);
router.get('/getPackageById/:id', getPackageById);
router.put('/updatePackage/:id', updatePackage);
router.delete('/deletePackage/:id', verifyAdmin, deletePackage);
router.get("/packages-by-branch/:id", packagesByBranch);
router.get("/branch-by-packages/:id", branchByPackages);
router.get("/packages/:branch", locationBranchPackages);


// location related api
router.post('/createLocation', verifyAdmin, createLocation);
router.get('/getAllLocations', getAllLocations);
router.get('/getLocationById/:id', getLocationById);
router.put('/updateLocation/:id', verifyAdmin, updateLocation);
router.delete('/deleteLocation/:id', verifyAdmin, deleteLocation);

// branch related api 
router.post('/createBranch', verifyAdmin, createBranch);
router.get('/getAllBranches', getAllBranches);
router.get('/getBranchById/:id', getBranchById);
router.put('/updateBranch/:id', updateBranch);
router.delete('/deleteBranch/:id', deleteBranch);
router.get("/locationby-branch/:id", locationByBranch)

// privacy related api 
router.post('/createPrivacy', createPrivacy);
router.get('/getAllPrivacy', getAllPrivacy);
router.get('/getPrivacyById', getPrivacyById);
router.put('/updatePrivacy/:id', updatePrivacy);
router.delete('/deletePrivacy/:id', deletePrivacy);
router.put("/privacy-upload", postPrivacy)

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
router.delete("/delete-photo/:id", deletePhoto)

// video gallery related api 
router.post('/uploadVideo', uploadVideo);
router.get('/getAllVideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.put('/updateVideo/:id', verifyAdmin, updateVideo);
router.delete('/deleteVideo/:id', verifyAdmin, deleteVideo);

// admin related api 
router.post('/createAdmin', createAdmin);
router.post('/updateUserRole', verifyAdmin, updateUserRole);
router.post('/adminLogin', adminLogin);
router.post("/admin-only-route", verifyAdmin, checkAdmin);
router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.delete("/deleteUser/:id", verifyAdmin, deleteUser);


// offer api

router.post("/create-offer", verifyAdmin, CreateOffer);
router.get("/all-offer", AllOffer);
router.get("/offer-by-id/:id", OfferById);
router.put("/offer-update/:id", verifyAdmin, OfferUpdate);
router.delete("/offer-delete/:id", verifyAdmin, OfferDelete);


// contact related api

router.post("/send-contact", sendContactData);
router.get("/all-data", allContactData);
router.put("/update-status/:id", statusUpdate);
router.delete("/delete-data/:id", deleteContact);

// about related data

router.put("/about-data", aboutDataUpload);
router.get("/aboutDataById", aboutDataById)



// mission vission related api

router.put("/mission", missionDataUpload);




// team related api

router.post("/team", createTeam);
router.get("/team", getAllTeamMember);
router.get("/team/:id", getTeamMemberById);
router.put("/team/:id", updateTeam);
router.delete("/team/:id", deleteTeam);



// booking api

router.post("/booking", createBooking);
router.get("/manage-booking", manageBookingPackages);
router.put("/manage-booking/:id", bookingFromStatusUpdate);
router.delete("/manage-booking/:id", deleteFrom);

router.post("/booking-upload", bookingUpload);
router.get("/all-booking", allBookingData);
router.get("/booking-by-id/:id", bookingById);


// why choose api

router.put("/why-choose", whyChooseDataUpload);
router.get("/why-choose", chooseDataById);



// mission vission api

router.put("/vission-mission", missionVisionUpload);
router.get("/vission-mission", missionvissionById);


// key features api





router.put("/key-features", keyFeatureUpload);
router.get("/key-features", keyFeatureData);


// faq related api

router.post("/faq", createFaq);
router.get("/faq", allFaq);
router.get("/faq/:id", faqById);
router.put("/faq/:id", faqUpdate);
router.delete("/faq/:id", faqDelete);


// payment related api

router.post("/payment", cratePayment);
router.get("/payment", getAllPayment);
router.get("/payment/:id", paymentById);
router.put("/payment/:id", paymentUpdate);
router.delete("/payment/:id", paymentDelete);


// term condiction

router.put("/post-term", postTermCondiction);
router.get("/get-term", getTermCondictionById);


// refund api

router.put("/refund", postRefund);
router.get("/refund", getRefundById);

// hotline related api

router.post("/upload", verifyAdmin ,uploadHotline);
router.get("/all-hotline",allNumber);
router.get("/hotline-by-id/:id", hotlineById );
router.put("/hotline-update/:id",  hotlineUpdate  );
router.delete("/hotline-delete/:id", hotlineDelete );



module.exports = router