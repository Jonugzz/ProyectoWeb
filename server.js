const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bycrypt = require('bcryptjs');
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

app.get('/details', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

//validar sesiones
app.get('/rp-analyzer/validate', (req, res) => {
    let sessionId = req.headers.id;
    
    if(sessionId == 0){
        return res.status(409).end();
    }
    return res.status(200).json("Valid sesion");
});

//POST para validar las credenciales del usuario en la db recibidas en el body de la req
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

//POST para crear un usuario en la db
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

//POST para agregar una receta a la lista de recetas del usuario
app.post('/rp-analyzer/saveRecipe', jsonParser, (req, res) => {
    const { title , ingredients, Calories, TotalFat, DailyFat, SaturatedFat, DailySF, TransFat, Cholesterol, DailyCH, Na, DailyNa, Carbohydrate, DailyCB, Fiber, DialyFB, Sugars, Protein, VitD, Calcium, Potassium, Iron, userE} = req.body;

    Users
        .getUser(userE)
        .then(user => {
            const newRep = {
                title,
                ingredients,
                Calories,
                TotalFat,
                DailyFat,
                SaturatedFat,
                DailySF,
                TransFat,
                Cholesterol,
                DailyCH,
                Na,
                DailyNa,
                Carbohydrate,
                DailyCB,
                Fiber,
                DialyFB,
                Sugars,
                Protein,
                VitD,
                Calcium,
                Potassium,
                Iron,
                user : user.id
            }

            Recipes
                .createRecipe(newRep)
                .then( createdR =>{
                    return res.status(201).json(createdR);
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                });


        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status(400).end();
        });
});

//Get que recibe la lista de recetas de un usuario
app.get('/rp-analyzer/getRe/:userEm', (req, res) => {
    const { userEm } = req.params;

    Users
        .getUser(userEm)
        .then(user => {
            const userObjectId = user.id;

            Recipes
                .getRecipesByUser(userObjectId)
                .then( recp => {
                    return res.status(200).json(recp);
                })
                .catch(err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                });
        })
        .catch(err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status(400).end();
        });
});

//POST que recibe un id en body para borrar una receta de un usuario
app.post('/rp-analyzer/view', jsonParser, (req, res) => {
    const { id } = req.body;
    
    var ObjectId = require('mongoose').Types.ObjectId;
    var o_id = new ObjectId(id);

    Recipes
        .getRecipebyId(o_id)
        .then( recipe => {
            return res.status(200).json(recipe);
        })
        .catch(err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status(400).end();
        });
});

//Get para mostrar la info de una receta
app.get('/rp-analyzer/getInfo/:id', (req, res) => {
    const { id } = req.params;
    
    var ObjectId = require('mongoose').Types.ObjectId;
    var o_id = new ObjectId(id);

    Recipes
        .getInfo(o_id)
        .then( recipe => {
            return res.status(200).json(recipe);
        })
        .catch(err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status(400).end();
        });
});

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