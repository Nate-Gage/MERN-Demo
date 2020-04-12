const recipeRouter = require('express').Router();
let Recipe = require('../models/recipe.model');

recipeRouter.route('/recipes').get((req, res) => {
    Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

recipeRouter.route('/add').post((req, res) => {
    const title = req.body.title;
    const cooktime = Number(req.body.cooktime);
    const description = req.body.description;

    const newRecipe = new Recipe({
        title,
        cooktime,
        description
    });

    newRecipe.save()
    .then(() => res.json('Recipe added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

recipeRouter.route('/edit/id:').post((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => {
        recipe.title = req.body.title;
        recipe.cooktime = Number(req.body.cooktime);
        recipe.description = req.body.description;

        recipe.save()
        .then(() => res.json('Recipe updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = recipeRouter;