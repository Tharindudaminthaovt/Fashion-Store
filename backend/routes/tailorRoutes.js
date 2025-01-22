const express = require('express');
const router = express.Router();
const {
  getTailorById,
  getAllTailors,
  createPost,
  searchTailors,
  getCollections,
  getTailorsByCollection,
  updateTailor,
  deleteTailor,
} = require('../controllers/tailorcont');


router.get('/tailor/:id', getTailorById);


router.get('/getallTailors', getAllTailors);


router.post('/create-post', createPost);


router.get('/search-results', searchTailors);


router.get('/collection', getCollections);


router.get('/collection/:name', getTailorsByCollection);


router.patch('/updatetailor/:id', updateTailor);


router.delete('/deleteTailor/:id', deleteTailor);

module.exports = router;