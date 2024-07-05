const express= require('express');
const router = express.Router();
const {createMovie,singleMovie,allMovie,updateMovie,deleteMovie} = require( "../controllers/MovieController.js");

const upload = require('../config/multerConfig');  

//to create a new Movie
router.post('/',upload.single('image'), createMovie);

//to get single Movie
router.get('/:id', singleMovie);

//to get all Movies
router.get('/', allMovie);

//to update Movie
router.put('/:id', updateMovie);

//to update Movie
router.delete('/:id', deleteMovie);



module.exports = router;

