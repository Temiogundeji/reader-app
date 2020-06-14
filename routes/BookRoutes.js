const app = require('../app');
const auth = require('../auth')(app);
const { Router } = require('express');
const router = Router();
const BookController = require('../controller/BookController');

module.exports = () => {
    router.route('/books')
    .all(auth.authenticate())
    .get(BookController.getAllBooks)
    .post(BookController.addBook)

    router.route('/books/:id')
    .all(auth.authenticate())
    .get(BookController.getABook)
    .put(BookController.updateBook)
    .delete(BookController.deleteBook)
}