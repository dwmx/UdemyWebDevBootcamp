const express = require('express')
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('./../utilities/catch_async');
const Campground = require('./../models/campground');
const { validateCampground, isLoggedIn, isAuthor } = require('./../middleware');
const multer = require('multer');
const { storage } = require('./../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.route('/new')
    .get(isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;