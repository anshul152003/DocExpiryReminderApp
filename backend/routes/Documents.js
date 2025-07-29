const express = require('express');
const router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const { getAllDocuments, createDocument, updateDocument, deleteDocument } = require('../controllers/DocumentController');

router.use(auth);

router.get('/', getAllDocuments);
router.post('/create', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;
