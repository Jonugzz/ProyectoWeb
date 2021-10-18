const mongoose = require('mongoose');

const userShcema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const userModel = mongoose.model('users', userShcema);

var Users = {
    createUser : function( newUser ){
        return userModel
                .create( newUser )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                });
    },
    getUser : function(email){
        return userModel
                .findOne( {email} )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                });
    }
}

module.exports = {
    Users
};