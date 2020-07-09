const BookService = require('../services/BookService');
const util = require('../lib/Utils');

module.exports = {
    getAllBooks : async (req, res) => {
        try{
            const allBooks = await BookService.getAllBooks();
            if(allBooks.length > 0){
                // util.setSuccess(200, 'All Books retrieved!')
                res.status(200).status({
                    books: allBooks,
                    message:'Book fetched successfully!'
                })
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

  addBook:  async (req, res) => {
        const { title, author, img } = req.body;
        if(title === null || author === null  || img === null ){
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
       
        try{
            const newBook = req.body;
            const createdBook = await BookService.addBook(newBook);
            util.setSuccess(201, 'Book Added!', createdBook);
            return util.send(res);
        }
        catch(error){
            util.setError(400, error.message);
            return util.send(res);
        }
    },

     updateBook:  async (req, res) => {
        const alteredBook = req.body;
        const { id } = req.params;
        if(!Number(id)){
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try{
            const updatedBook = await BookService.updateBook(id, alteredBook);
            if(!updatedBook){
                util.setError(404, `Cannot find book with the id: ${id}`);
            }
            else{
                util.setSuccess(200, 'Book updated', updatedBook);
            }
            return util.send(res);
        }
        catch(error){
            util.setError(404, error);
            return util.send(res);
        }
    },

    getABook: async (req, res) => {
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