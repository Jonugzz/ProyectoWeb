const { create } = require('domain');
const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ingredients: {
        type : String,
        required : true
    },
    Calories : {
        type : String,
        required : true
    },
    TotalFat : {
        type : String,
        required : true
    },
    DailyFat : {
        type : String,
        required : true
    },
    SaturatedFat : {
        type : String,
        required : true
    },
    DailySF : {
        type : String,
        required : true
    },
    TransFat : {
        type : String,
        required : true
    },
    Cholesterol : {
        type : String,
        required : true
    },
    DailyCH : {
        type : String,
        required : true
    },
    Na : {
        type : String,
        required : true
    },
    DailyNa : {
        type : String,
        required : true
    },
    Carbohydrate : {
        type : String,
        required : true
    },
    DailyCB : {
        type : String,
        required : true
    },
    Fiber : {
        type : String,
        required : true
    },
    DialyFB : {
        type : String,
        required : true
    },
    Sugars : {
        type : String,
        required : true
    },
    Protein : {
        type : String,
        required : true
    },
    VitD : {
        type : String,
        required : true
    },
    Calcium : {
        type : String,
        required : true
    },
    Potassium : {
        type : String,
        required : true
    },
    Iron : {
        type : String,
        required : true
    },
    user : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
});

const recipeCollection = mongoose.model('recipes', recipeSchema);

const Recipes = {
    createRecipe : function(newRep){
        return recipeCollection
                .create(newRep)
                .then(createdRep => {
                    return createdRep;
                })
                .catch( err => {
                    throw new Error(err);
                });
    },
    getInfo : function(id){
        return recipeCollection
                .findOne( {_id : id} )
                .then( recipe => {
                    return recipe;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getRecipesByUser : function( userObjectId){
        return recipeCollection
                .find( { user : userObjectId } )
                .then( allRec => {
                     return allRec;
                })
                .catch(err => {
                    throw new Error( err );
                });
    },
    getRecipebyId : function(id){
        return recipeCollection
                .findOneAndDelete( {_id : id} )
                .then( recipe => {
                    return recipe;
                })
                .catch( err => {
                    throw new Error( err );
                });
    } 
}

module.exports = {
    Recipes
};