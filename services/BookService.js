const Book = require('../models').Book;
const { Op } = require('sequelize');

module.exports = {
   getAllBooks: async() => {
        try{
            return await Book.findAll();
        } catch(error){
            throw error;
        }
    },

    addBook: async (newBook) => {
        try{
            return await Book.create(newBook);
        }        
        catch(error){
            throw error;
        }
    },

    getBookByFavorite: async () => {
        
        try{
            const favoriteBooks = await Book.findAll({
                where: { isFavorite: true }
            });
            
            return favoriteBooks;
        }
        catch(error){
            console.log(error);
        }
    },

    updateBook: async (id, updateBook) => {
        try{
            const bookToUpdate =  await Book.findOne({
                where: { id: Number(id) }
            })

            if(bookToUpdate){
                await Book.update(updateBook, { where: { id: Number(id) }})
                return updateBook;
            }
            
        }
        catch(error){
            throw error;
        }
    },

    getABook: async (id) => {
        try{
            const aBook = await Book.findOne({
                where:{ id: Number(id) }
            })
            return aBook;
        }
        catch(error){
            throw error;
        }
    },

    deleteBook: async (id) => {
        try{
            const bookToDelete = Book.findOne({
                where: { id: Number(id)}
            });

            if(bookToDelete){
               const deleted = await Book.destroy({
                   where: { id: Number(id)}
               });

               return deleted;
            }
        }
        catch(error){
            throw error;
        }
    }
    
}
        