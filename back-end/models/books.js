var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        gerne: {
            type: String
        },
        
    }
);

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;