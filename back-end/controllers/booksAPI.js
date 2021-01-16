const Book = require('../models/books');

const User = require('../models/users');

module.exports = {
   
    addBook: (newBook, callback) => {
        Book.create(newBook, callback);
    },

    updateBook: (id, updateBook, callback) => {
        Book.findByIdAndUpdate(id, updateBook, callback);
    },

    deleteBook: (id, callback) => {
        Book.findByIdAndRemove(id, callback);
    }

}