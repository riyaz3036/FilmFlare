const Movie = require('../models/Movie.js');
const Producer = require('../models/Producer.js');
const Actor = require('../models/Actor.js');  
const User = require('../models/User.js');
const mongoose = require('mongoose');  


//add a movie (TESTED)
const createMovie = async (req, res) => {
    const { name, year, plot, actors, producer, user_id } = req.body;
    const image = req.file ? req.file.path : null;  // Get image path from multer

    try {

        // Create a new Movie instance
        const newMovie = new Movie({
            user_id,
            name,
            year,
            plot,
            image,
            actors,  
            producer
        });
        

        // Save the new Movie
        const savedMovie = await newMovie.save();

        // Push this id of movie into user's movies array
        await User.findByIdAndUpdate(
            user_id,
            { $push: { movies: savedMovie._id } },
            { new: true, useFindAndModify: false }
        );

        // Update the Producer's movies array
        await Producer.updateOne(
            { _id: savedMovie.producer },
            { $push: { movies: savedMovie._id } }
        );

        // Update the Actors' movies array
        await Actor.updateMany(
            { _id: { $in: savedMovie.actors } },
            { $push: { movies: savedMovie._id } }
        );

        // Respond with the success message and saved movie data
        res.status(200).json({
            success: true,
            message: 'Successfully created movie and updated producer and actors',
            data: savedMovie,
        });

    } catch (err) {
     
        res.status(500).json({
            success: false,
            message: 'Failed to create movie. Please try again.',
            error: {
                message: err.message,
                stack: err.stack,  // Log the stack trace
                name: err.name,    // Log the error name
                errors: err.errors,  // Log validation errors if any
            },
        });
    }
};




//getSingle movie (TESTED)
const singleMovie = async (req,res)=>{
    const id = req.params.id;

  try {
    const movie = await Movie.findById(id).populate({path:'actors' , model:'Actor'}).populate({path:'producer' , model:'Producer'});
      

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    res.status(200).json({ success: true, message: 'Successfully fetched movie', data: movie });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch movie. Please try again!' });
  }
}


//getAll movies (TESTED)
const allMovie = async (req,res)=>{
         console.log("heyyy123");
         try{
            const movie = await Movie.find({}).populate({path:'actors' , model:'Actor'}).populate({path:'producer' , model:'Producer'});
            res.status(200).json({success:true, message: 'Succesfully shown', data: movie});
    
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }  
     
}


//updating a Movie (TESTED)
const updateMovie = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedMovie = await Movie.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedMovie});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}



//deleting a Movie 
const deleteMovie = async (req,res)=>{

    const movieId = req.params.id;

    try {
        // Find the movie to be deleted
        const movie = await Movie.findById(movieId).populate('actors producer');
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Remove the Movie ID from the Producer's movies array
        await Producer.updateOne(
            { _id: movie.producer },
            { $pull: { movies: movieId } }
        );

        // Remove the Movie ID from the Actors' movies array
        await Actor.updateMany(
            { _id: { $in: movie.actors } },
            { $pull: { movies: movieId } }
        );

        // Delete the Movie
        await Movie.findByIdAndDelete(movieId);

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Successfully deleted movie and updated producer and actors',
        });

    } catch (err) {
        // Handle errors
        res.status(500).json({
            success: false,
            message: 'Failed to delete movie. Please try again.',
            error: err.message,
        });
    }
}




module.exports = {createMovie,singleMovie,allMovie,updateMovie,deleteMovie};