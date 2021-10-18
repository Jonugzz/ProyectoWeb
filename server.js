const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bycrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { DATABASE_URL, PORT } = require('./config');
const { Users } = require('./models/users-model');
const { Recipes } = require('./models/recipes-model');
const app = express();
const jsonParser = bodyParser.json();

var path = require('path');
app.use(express.static('public'))
app.use(morgan('dev'));

//Routes
app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/analyzer', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'analyzer.html'));
});

app.get('/recipes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'recipes.html'));
});

app.get('/aboutus', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

//validate session
app.get('/rp-analyzer/validate', (req, res) => {
    let sessionId = req.headers.id;
    
    if(sessionId == 0){
        return res.status(409).end();
    }
    return res.status(200).json("Valid sesion");
});

//POST 
app.post('/rp-analyzer/login', jsonParser, (req, res) => {
    let { email, password} = req.body;

    if( !email || !password){
        res.statusMessage = "Parameter missing in the request.";
        return res.status(406).end();
    }

    Users
        .getUser(email)
        .then( user => {
            if(user == null){
                res.statusMessage = "The email adress that you entered doesn't match any account.";
                return res.status(406).end();
            }
            bycrypt.compare(password, user.password)
                .then( result => {
                    if(result){
                        let userData = {
                            id : user.id,
                            email : user.email
                        };

                        return res.status(200).json(userData);
                    }
                    else{
                        res.statusMessage = "Invalid credentials";
                        return res.status(400).end();
                    }
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                });
        });
});

//POST to create a new user in the db
app.post('/rp-analyzer/register', jsonParser, (req, res) => {
    let {userName, email, password} = req.body;

    if(!userName || !email || !password){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status(406).end();
    }

    bycrypt.hash(password, 10)
        .then( hashedpass => {
            let newUser = { 
                userName, 
                email, 
                password : hashedpass
            };

        Users
            .createUser(newUser)
            .then( result => {
                return res.status(201).json(result);
            })
            .catch( err => {
                res.statusMessage = "Email alreay in use";
                return res.status(400).end();
            });
    })
    .catch( err => {
        res.statusMessage = err.message;
        return res.status(400).end();
    });
        
});

//app.post('/rp-analyzer/saveRecipe')

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);

    new Promise( (resolve, reject) => {
        mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if( err ){
                reject( err );
            }
            else{
                console.log("Conected successfuly to the dbs");
                return resolve();
            }
        })
    })
    .catch( er => {
        mongoose.disconnect();
        console.log( err );
    }); 
});