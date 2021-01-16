var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config/database');

var User = require('../models/users');
var Book = require('../models/books');

var userController = require('../controllers/userAPI');

router.post('/register', (req, res) => {
    let newUser = new User(req.body);

    userController.addUser(newUser, (err, user) => {
        if (err) {
            throw err;
        } else {
            res.json({success: true, msg:'user registered'});
        }
    });
})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
})

router.post('/authenticate', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    userController.getUserByUsername(username, (err, user) => {                
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        }        
        userController.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            }else {
                return res.json({success: false, msg:'wrong password'});
            }
        });
    });
})

//Create a post to update the bookmarks field
router.post('/bookmark/:id', async (req,res)=>{
    const book = await Book.findById(req.body.bookId);

    const user = await User.findById(req.params.id);

    user.bookmarks.push(book);
    
    await user.save();

    res.json({success: true, msg:'bookmark added'}); 
})
//Get all users
router.get('/', async (req,res) => {
    const users = await User.find().populate({
        path: 'bookmarks',
        model: 'Book'
    }).populate({
        path: 'borrows._id',
        model: 'Book'
    })
    res.json({success: true, user:users})   
}) 


module.exports = router;