var express = require('express');
var router = express.Router();

var Books = require('../controllers/booksAPI');
var Book = require('../models/books');

router.get('/books', (req, res, next) => {
    Books.getBooks( (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.post('/books', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        gerne: req.body.gerne
    }
    console.log(newBook);    
    Books.addBook(newBook, (error, books) => {
        if (error) {
            res.json({success: false, msg:'Failed to register the user'});
        }else {
            res.json({success: true, msg:'book registered', book:books});
        }
    });
})

router.get('/books/:_id', (req, res, next) => {
    Books.getBook(req.params._id,(error, books) => {
        if (error) {
            throw error;           
        }else {
            res.json({success: true, msg:'book found', book:books});
        }
    });
})

router.put('/books/:_id',  (req, res) => {
    var update = {
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        gerne: req.body.gerne
    }
    Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json({success: true, msg:'book edited', book:books});
        }
    })
})

router.delete('/books/:id', (req, res) => {
    Books.deleteBook(req.params.id, (error, books) => {                
        if (error) {
            res.json({success: false, msg:'book delete failed'});
        }else {
            res.json({success: true, msg:'book deleted', deletedbook:books});
        } 
    })
})

router.patch('/books/:_id', (req, res) => {
    var update = req.body;
    Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json({success: true, msg:'book updated with a patch', book:books});
        }
    })
})

router.patch('/book/:_id', async (req, res)=>{
 Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error
        } else {
            res.json({success: true, msg:'Book made available - removed borrower', borrowedUser: bookBorrower})
        }
    })


})

module.exports = router;

