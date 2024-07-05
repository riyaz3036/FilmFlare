const express = require('express');
const router = express.Router();
const {
    createProducer,
    getAllProducers,
    getProducerById,
    updateProducer,
    deleteProducer,
} = require('../controllers/ProducerController');

const upload = require('../config/multerConfig'); 

// Route to create a new Producer
router.post('/', upload.single('image'), createProducer);  // Handle image upload

// Route to get all Producers
router.get('/', getAllProducers);

// Route to get a specific Producer by ID
router.get('/:id', getProducerById);

// Route to update a Producer by ID
router.put('/:id', upload.single('image'), updateProducer);  // Handle image upload

// Route to delete a Producer by ID
router.delete('/:id', deleteProducer);

module.exports = router;
