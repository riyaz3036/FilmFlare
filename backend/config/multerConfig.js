const multer = require('multer');
const path = require('path');

// Set up storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directory where files will be uploaded
  },
  filename: (req, file, cb) => {
    // Set the file name to include a timestamp for uniqueness
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);  // Reject the file
  }
};

// Create the multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,  // Set a file size limit of 2MB
  },
});

module.exports = upload;
