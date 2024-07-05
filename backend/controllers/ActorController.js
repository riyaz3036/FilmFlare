const Movie = require('../models/Movie.js');
const Producer = require('../models/Producer.js');
const Actor = require('../models/Actor.js');  
const User = require('../models/User.js');
const mongoose = require('mongoose');  

// Create a new Actor (TESTED)
const createActor = async (req, res) => {
    
    const { username, gender, dob, bio,user_id } = req.body;
    const image = req.file ? req.file.path : null;  // Get image path from multer

    try {
        const newActor = new Actor({
            user_id,
            username,
            gender,
            dob,
            bio,
            image,
        });

        const savedActor = await newActor.save();

        // Push this id of actor into actors array of User schema
        await User.findByIdAndUpdate(
            user_id,
            { $push: { actors: savedActor._id } },
            { new: true, useFindAndModify: false }
        );


        res.status(201).json({
            success: true,
            message: 'Successfully created actor and updated movies',
            data: savedActor,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to create actor. Please try again.',
            error: {
                message: err.message,
                stack: err.stack,  // Log the stack trace
                name: err.name,    // Log the error name
                errors: err.errors,  // Log validation errors if any
            },
        });
    }
};

// Get all Actors (TESTED)
const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find().populate('movies');
        res.status(200).json({
            success: true,
            data: actors,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve actors. Please try again.',
            error: err.message,
        });
    }
};

// Get a specific Actor by ID (TESTED)
const getActorById = async (req, res) => {
    const { id } = req.params;

    try {
        const actor = await Actor.findById(id).populate('movies');
        if (!actor) {
            return res.status(404).json({ success: false, message: 'Actor not found' });
        }

        res.status(200).json({
            success: true,
            data: actor,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve actor. Please try again.',
            error: err.message,
        });
    }
};

// Update an Actor by ID (TESTED)
const updateActor = async (req, res) => {
    const { id } = req.params;
    const { username, gender, dob, bio, movies } = req.body;
    const image = req.file ? req.file.path : null;  // Get image path from multer

    try {
        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({ success: false, message: 'Actor not found' });
        }

        const updatedActor = await Actor.findByIdAndUpdate(
            id,
            { username, gender, dob, bio, image, movies },
            { new: true }  // Return the updated document
        );

        await Movie.updateMany(
            { _id: { $in: movies } },
            { $push: { actors: updatedActor._id } }
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated actor and updated movies',
            data: updatedActor,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update actor. Please try again.',
            error: err.message,
        });
    }
};

// Delete an Actor by ID (TESTED)
const deleteActor = async (req, res) => {
    const { id } = req.params;

    try {
        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({ success: false, message: 'Actor not found' });
        }

        await Movie.updateMany(
            { actors: id },
            { $pull: { actors: id } }
        );

        await Actor.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted actor and updated movies',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete actor. Please try again.',
            error: err.message,
        });
    }
};

module.exports = {
    createActor,
    getAllActors,
    getActorById,
    updateActor,
    deleteActor,
};
