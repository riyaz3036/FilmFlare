const express = require('express');
const router = express.Router();
const {
    createActor,
    getAllActors,
    getActorById,
    updateActor,
    deleteActor,
} = require('../controllers/ActorController.js');


const upload = require('../config/multerConfig');  

// Route to create a new Actor
router.post('/', upload.single('image'), createActor);


// Route to get all Actors
router.get('/', getAllActors);

// Route to get a specific Actor by ID
router.get('/:id', getActorById);

// Route to update an Actor by ID
router.put('/:id', upload.single('image'), updateActor);  

// Route to delete an Actor by ID
router.delete('/:id', deleteActor);

module.exports = router;
