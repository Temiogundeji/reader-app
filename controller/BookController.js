const BookService = require('../services/BookService');
const Book = require('../models/index').Book;
const util = require('../lib/Utils');

module.exports = {
    getAllBooks : async(req, res) => {
        try{
            const allBooks = await BookService.getAllBooks({
                order: ['id', 'ASC']
            });
            
            if(allBooks.length > 0){
                util.setSuccess(200, 'All Books retrieved!', allBooks)
            }
            else{
                util.setSuccess(200, 'No Books found!')
            }
            return util.send(res)
            
        }
        catch(error){
            util.setError(400, error);
            return util.send(res);
        }
    },
    getFavorites: async (req, res) => {
        try{
            const favoriteBooks = await BookService.getBookByFavorite();
            console.log(favoriteBooks);
            
                res.status(200).json({
                    message: 'Books fetched successfully!',
                    data: favoriteBooks
                });
        }
        catch(error) {
            console.log(error);
        }
    },

    addBook: async (req, res) => {
        try{
            const createdBook = await BookService.addBook(req.body);
            res.status(201).json({
                data: createdBook,
                message: 'Book has been added successfully!'
            });
        }
        catch(error){
            return res.status(400).json({
                message: error.message
            });
        }
    },

     updateBook: async (req, res) => {
        const alteredBook = req.body;
        const { id } = req.params;
        
        if(!Number(id)){
            return res.status(400).send('Please input a valid numeric value');
        }

        try{
            const updatedBook = BookService.updateBook(id, alteredBook);
            if(!updatedBook){
                res.status(404).json({
                    message: `Cannot find book with the id ${id}`
                });
            }
            else{
                res.status(200).json({
                    message: 'Book updated',
                    data: updatedBook
                });
            }
        }
        catch(error){
            util.setError(404, error);
            return util.send(res);
        }
    },

    getABook: async(req, res) => {
        const { id } = req.params;

        if(!Number(id)){
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try{
            const theBook = await BookService.getABook(id);
            if(!theBook){
               util.setError(404, `Cannot find book with the id ${id}`);
            }
            else{
                util.setSuccess(200, 'Found Book', theBook);
            }
            return util.send(res);
        }
        catch(error){
            util.setError(404, error);
            return util.send(res);
        }
    },
    
    deleteBook: async (req, res) => {
        const { id } =  req.params;
        if(!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }
        try{
            const bookToDelete = await BookService.deleteBook(id);
            if(bookToDelete){
                util.setSuccess(200, 'Book successfully deleted!', bookToDelete)
            }
            else{
                util.setError(400, 'Book not deleted!')
            }
            return util.send(res);
        }
        catch(error){
            util.setError(404, error);
            return util.send(res);
        }
    }
}