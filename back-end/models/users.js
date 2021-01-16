var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({ 
    name: {
        type: String,
        required: true
    },      
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;