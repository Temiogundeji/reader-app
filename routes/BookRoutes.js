const app = require('../app');
const auth = require('../auth')(app);
const router = require('express').Router();
const BookController = require('../controller/BookController');

router.get('/', BookController.getAllBooks);
router.get('/favorites', BookController.getFavorites);
router.post('/', BookController.addBook);
router.get('/:id', BookController.getABook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
