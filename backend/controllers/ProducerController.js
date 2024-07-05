const Producer = require('../models/Producer.js'); 
const Movie = require('../models/Movie.js');  
const User = require('../models/User.js');  

// Create a new Producer (TESTED)
const createProducer = async (req, res) => {
   
    const { username, gender, dob, bio,user_id} = req.body;
    const image = req.file ? req.file.path : null;  // Get image path from multer
   
    try {
        const newProducer = new Producer({
            user_id,
            username,
            gender,
            dob,
            bio,
            image,
        });
        
        const savedProducer = await newProducer.save();

        // Push this id of actor into actors array of User schema
        await User.findByIdAndUpdate(
            user_id,
            { $push: { producers: savedProducer._id } },
            { new: true, useFindAndModify: false }
        );
       
        res.status(201).json({
            success: true,
            message: 'Successfully created producer and updated movies',
            data: savedProducer,
        });

    } catch (err) {
        
        res.status(500).json({
            success: false,
            message: 'Failed to create producer. Please try again.',
            error: {
                message: err.message,
                stack: err.stack,  // Log the stack trace
                name: err.name,    // Log the error name
                errors: err.errors,  // Log validation errors if any
            },
        });
    }
};

// Get all Producers (TESTED)
const getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find().populate('movies');
        res.status(200).json({
            success: true,
            data: producers,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve producers. Please try again.',
            error: err.message,
        });
    }
};

// Get a specific Producer by ID (TESTED)
const getProducerById = async (req, res) => {
    const { id } = req.params;

    try {
        const producer = await Producer.findById(id).populate('movies');
        if (!producer) {
            return res.status(404).json({ success: false, message: 'Producer not found' });
        }

        res.status(200).json({
            success: true,
            data: producer,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve producer. Please try again.',
            error: err.message,
        });
    }
};

// Update a Producer by ID (TESTED)
const updateProducer = async (req, res) => {
    const { id } = req.params;
    const { username, gender, dob, bio, movies } = req.body;
    const image = req.file ? req.file.path : null;  // Get image path from multer

    try {
        const producer = await Producer.findById(id);
        if (!producer) {
            return res.status(404).json({ success: false, message: 'Producer not found' });
        }

        const updatedProducer = await Producer.findByIdAndUpdate(
            id,
            { username, gender, dob, bio, image, movies },
            { new: true }  // Return the updated document
        );

        await Movie.updateMany(
            { _id: { $in: movies } },
            { $set: { producer: updatedProducer._id } }  // Set the producer for these movies
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated producer and updated movies',
            data: updatedProducer,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update producer. Please try again.',
            error: err.message,
        });
    }
};

// Delete a Producer by ID (TESTED)
const deleteProducer = async (req, res) => {
    const { id } = req.params;

    try {
        const producer = await Producer.findById(id);
        if (!producer) {
            return res.status(404).json({ success: false, message: 'Producer not found' });
        }

        if (producer.movies.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete: producer is linked to a movie' 
            });
        }

        await Movie.updateMany(
            { producer: id },
            { $unset: { producer: "" } }  // Remove the producer for these movies
        );

        await Producer.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted producer and updated movies',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete producer. Please try again.',
            error: err.message,
        });
    }
};

module.exports = {
    createProducer,
    getAllProducers,
    getProducerById,
    updateProducer,
    deleteProducer,
};
