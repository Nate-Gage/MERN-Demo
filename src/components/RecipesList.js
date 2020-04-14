import React, { Component } from 'react';
import axios from 'axios';
import '../App';
import Recipe from './Recipe';

class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    };

    componentWillMount() {
        axios.get('http://localhost:5000/recipes')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        recipes: res.data.map(recipe => {
                            return recipe
                        })
                    });
                    console.log(this.state.recipes);
                } else {
                    console.log('There was an error getting the recipes');
                }
            });
    }

    render() {
        return (
            <div>
                <h1 className="header">My Recipes</h1>
                <p>Click on a recipe below to view and edit details</p>
                {this.state.recipes.map(recipe => (
                    <Recipe
                        key={recipe.id}
                        recipe={recipe}
                        title={recipe.title}
                        cooktime={recipe.cooktime}
                        description={recipe.description}
                    />
                ))}
            </div>
        );
    }
};

export default RecipesList;

